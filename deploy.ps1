#Requires -Version 5.1
<##
.SYNOPSIS
    Manually trigger one GitHub Pages deployment.

.DESCRIPTION
    This script does not commit or push changes. It dispatches the deployment
    workflow once; the workflow performs the build and publishes the site.

.EXAMPLE
    .\deploy.ps1

.EXAMPLE
    .\deploy.ps1 -Ref main
#>

[CmdletBinding()]
param(
    [string]$Repository = 'StarBobis/MIMITools',
    [string]$Workflow = 'deploy.yml',
    [string]$Ref = 'main'
)

$ErrorActionPreference = 'Stop'

if (-not (Get-Command gh -ErrorAction SilentlyContinue)) {
    throw '未找到 GitHub CLI（gh）。请先安装：https://cli.github.com/'
}

Write-Host "检查 GitHub CLI 登录状态..."
& gh auth status --hostname github.com
if ($LASTEXITCODE -ne 0) {
    throw 'GitHub CLI 尚未登录，请先运行：gh auth login'
}

Write-Host "正在触发 $Repository 的一次部署（分支：$Ref）..."
& gh workflow run $Workflow --repo $Repository --ref $Ref
if ($LASTEXITCODE -ne 0) {
    throw '触发部署失败。请确认仓库、工作流文件和权限配置正确。'
}

Write-Host '部署已触发，GitHub Actions 将在云端完成构建与发布。' -ForegroundColor Green
Write-Host "查看进度：https://github.com/$Repository/actions/workflows/deploy.yml"
