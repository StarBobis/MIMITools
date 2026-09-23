> 注意, 如果你还不会命令行 (对 Windows 用户), 请主动去学习, 否则接下来的操作你一头雾水.

现在我们开始喜闻乐见的 Hello World.

首先请建立一个用于存放 Rust 项目的文件夹并进入:

::: tabs
== Windows
```powershell
New-Item -Path "Rust" -ItemType Directory
Set-Location Rust 
```
> 注意此举将会在用户目录下新建一个 `Rust` 文件夹: `C:\Users\你的用户名\Rust\`, 如果期望该文件夹位于其他地方, 尝试在此之前移动到其他地方, 例如移动到 `D:` 盘根目录:
```powershell
Set-Location "D:\"
```
== Linux/WSL
```shell
md Rust && cd R*
```
:::
然后在编辑器中新建一个 `哈喽-World.rs`, 或直接在终端建立该文件:
::: tabs
== Windows
```powershell
New-Item "哈喽-World.rs"
```
== Linux/WSL
```shell
touch "哈喽-World.rs"
```
:::

接下来即可在我们的编辑器中编辑该文件了, 在我们的 `哈喽 World.rs` 中写入以下内容:
```rust
fn main() {
    println!("Hello 世界!");
}
```
而后<span style="color: red">**保存**</span>.
::: warning 关于保存
**<span style="color:red">数据无价, 谨慎操作!</span>** 通常的绝大多数文本编辑器都支持 `Ctrl + S` 保存当前工作内容, 支持 `Ctrl + Shift + S` 将当前内容另存为其他文件, 但**并非所有**编辑器都支持, 而有的编辑器在**有些时候不会**立即保存, 而是会弹窗询问, 此时请注意处理, 而不是直接关闭编辑器.

一些比较重型的编辑器可能有*自动保存*与*数据恢复*功能, 如果不慎导致未能保存, 可以在此方向尝试补救.
:::
::: tip 关于自动保存
对于 VSCode 玩家, 可以按 `Ctrl+Shift+P` 输入 `Preferences: Open User Settings (JSON)` 打开设置文件, 在其中填入
```json
{
    "files.autoSave": "afterDelay",
    "files.autoSaveDelay": 500,
}
```
<span style="color: red">**并保存**</span>, 然后即可自动保存所有更改.

此外, 若希望某种配置仅在当前工作空间 (workspace) 生效, 可以在`Preferences: Open Workspace Settings (JSON)`, 然后在当前工作空间中调整相应配置. 技术上, 由用户设置先覆盖 VSCode 默认设置, 然后由工作空间设置覆盖用户设置. 因此, 如果有时在用户设置里怎么配置都不灵, 可以看一眼当前工作空间中是否已有配置项已经覆盖了目标配置项.
:::
## 编译与运行
保存代码文件, 打开命令行, 切换到与代码文件所在目录相同目录, 运行 `rustc` 以编译代码文件:
```shell
rustc "哈喽-World.rs"
```
::: tip
对了, 如果文件名不包含空格, 双引号可以不写.
:::
编译通过后可以尝试运行生成在相同目录的结果:
:::: tabs
== Windows
```powershell
".\哈喽-World.exe"
```
::: tip
如果路径中不包含空格,  双引号可有可无, 但在 Windows Powershell 环境下必须添加前导的 `.\`, 尽管直接键入 `.exe` 文件的名称能使其发现可执行文件, 但其拒绝执行.
:::
== Linux/WSL
```shell
./哈喽-World
```
::::

预期在控制台中新的一行打印代码内的文本:
```shell
> .\哈喽-World.exe
Hello 世界!
```

如果:

- 没有输出: 恭喜你环境<span style="color:red">没配好</span>, 回去重新配吧.
- 正确输出: 请继续.

## 程序结构

我们回来看这份极简代码:

```rust
fn main() {
    println!("Hello 世界!");
}
```

第一行 `fn main() {}` 定义了名字叫 `main` 的*函数 (<span style="color: cyan">f</span>unctio<span style="color: cyan">n</span>)*, 这行代码实际是 `fn main() -> () {}` 的简写形式. 第一对括号表示函数接收的参数, 此处意为不接收任何参数; 而第二对括号是指 `main` 函数返回值的类型为空类型 `()`, 任何不返回任何东西的代码均返回空类型; 花括号 `{}` 内部定义了 `main` 函数的函数内容, 决定了这个函数将要去做些什么.
::: tip 关于 `main` 函数
`main` 函数很特别, 每个 Rust 可执行程序均会最先运行 `main` 函数.
:::

第二行 `println!("Hello 世界!");` 的作用是打印一串文本. 其中涉及以下信息:
- Rust 的缩进**是且仅是** 4 个空格而非一个 Tab (仅仅是规范, 实际上和 C/C++ 一样随意, 不换行也没人管你.);
- `println!` 是一个*宏 (macro)*, 而非像 `main` 那样的函数. 宏的特征是以叹号 `!` 结尾, 目前仅需要知道宏允许不确定的参数数量, 而 `println!` 这个宏用于在新的一行打印文本并换行;
- "Hello World" 是字符串, 被双引号 `""` 包裹, 作为宏 `println!` 的参数;
- Rust 完全支持 UTF-8 编码方案的 Unicode 字符, 请尽情使用;
- Rust 代码以 `;` 结尾.

:::warning 编译 != 运行

你需要用 `rustc` 编译 `.rs` 源代码文件, 然后运行得到的可执行文件. 如果第三方机器需要运行你的可执行文件, 第三方无需安装另一份 Rust.

- 与之类似的编译型语言: C/C++, GoLang;
- 与之相反的解释型语言: Python, JavaScript/TypeScript;
- 四不像的中间类型语言: Java, C#.

编译型语言通常不需要或仅需要极少的*运行时 (Runtime)*, 也因此而更适合去干一些脏活累活;

解释型语言往往需要独立的运行时环境, 如 Python 之于 Python, C# 之于 CLR, Java 之于 JRE, 特征是对程序员心智负担相对更少, 效率则比较堪忧;
:::
:::warning rustc 只是玩具
相比毛坯房 rustc, 我们下文将介绍的 cargo 才是重点.
:::