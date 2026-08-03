// .vitepress/katex-compat.js
import katex from 'katex'

const katexPlugin = (md, options = {}) => {
    // 行内公式渲染器
    const inlineRenderer = (tokens, idx) => {
        try {
            return katex.renderToString(tokens[idx].content, {
                ...options,
                displayMode: false
            })
        } catch (error) {
            return `<span style="color: red">KaTeX错误: ${error.message}</span>`
        }
    }

    // 块级公式渲染器
    const blockRenderer = (tokens, idx) => {
        try {
            return katex.renderToString(tokens[idx].content, {
                ...options,
                displayMode: true
            })
        } catch (error) {
            return `<div style="color: red">KaTeX错误: ${error.message}</div>`
        }
    }

    // 检测行内公式 $...$
    md.inline.ruler.after('escape', 'math_inline', (state, silent) => {
        const start = state.pos
        
        // 必须是 $ 开头
        if (state.src.charCodeAt(start) !== 0x24) return false
        
        // 检查是不是 $$ 开头（块级公式）
        if (state.src.charCodeAt(start + 1) === 0x24) return false
        
        let pos = start + 1
        let found = false
        
        // 寻找匹配的 $
        while (pos < state.src.length) {
            // 找到 $
            if (state.src.charCodeAt(pos) === 0x24) {
                // 确保不是 $$ 的情况
                if (pos + 1 < state.src.length && state.src.charCodeAt(pos + 1) === 0x24) {
                    pos += 2
                    continue
                }
                found = true
                break
            }
            pos++
        }
        
        if (!found) return false
        
        if (!silent) {
            const token = state.push('math_inline', 'math', 0)
            token.content = state.src.slice(start + 1, pos)
            token.block = false
        }
        
        state.pos = pos + 1
        return true
    })

    // 检测块级公式 $$...$$
    md.block.ruler.before('fence', 'math_block', (state, startLine, endLine, silent) => {
        // 获取当前行的内容
        const pos = state.bMarks[startLine] + state.tShift[startLine]
        const max = state.eMarks[startLine]
        const lineContent = state.src.slice(pos, max)
        
        // 必须是以 $$ 开头
        if (lineContent.length < 2 || lineContent.slice(0, 2) !== '$$') {
            return false
        }
        
        // 检查是否在同一行结束（单行公式）
        const endIndex = lineContent.indexOf('$$', 2)
        if (endIndex !== -1) {
            if (!silent) {
                const token = state.push('math_block', 'math', 0)
                token.content = lineContent.slice(2, endIndex).trim()
                token.block = true
                token.map = [startLine, startLine + 1]
                token.markup = '$$'
            }
            state.line = startLine + 1
            return true
        }
        
        // 多行公式：寻找结束的 $$
        let nextLine = startLine + 1
        let found = false
        let content = lineContent.slice(2) + '\n' // 开始行的内容
        
        while (nextLine < endLine) {
            const lineStart = state.bMarks[nextLine] + state.tShift[nextLine]
            const lineEnd = state.eMarks[nextLine]
            const nextLineContent = state.src.slice(lineStart, lineEnd)
            
            // 查找结束的 $$
            const endPos = nextLineContent.indexOf('$$')
            if (endPos !== -1) {
                // 找到结束标记
                content += nextLineContent.slice(0, endPos)
                found = true
                break
            } else {
                // 不是结束行，继续添加内容
                content += nextLineContent + '\n'
            }
            nextLine++
        }
        
        if (!found) return false
        
        if (!silent) {
            const token = state.push('math_block', 'math', 0)
            token.content = content.trim()
            token.block = true
            token.map = [startLine, nextLine + 1]
            token.markup = '$$'
        }
        
        // 更新解析位置到结束行的下一行
        state.line = nextLine + 1
        return true
    })

    // 注册渲染器
    md.renderer.rules.math_inline = inlineRenderer
    md.renderer.rules.math_block = blockRenderer
}

export default katexPlugin