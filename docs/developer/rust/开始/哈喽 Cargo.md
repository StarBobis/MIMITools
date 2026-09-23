前文所述的 rustc 功能相当局限, 若需构建较大些的项目, 必须要使用 Cargo 完成.
## 什么是 Cargo?
在安装 Rust 本体时已经附带的一个工具, 为 Rust 为自身设计的构建系统与包管理器.
:::tip
如果需要验证是否成功安装的话, 运行命令:
```shell
cargo --version
```
:::
## 如何使用?
不能像使用 rustc 那样随意放置代码, 我们需要主动使用 Cargo 去创建一个项目, 然后去修改这个项目内的那些文件.
### 创建项目
```shell
cargo new hello_cargo
```
该命令将会在当前路径下创建一个名为 `hello_cargo` 的子目录, `cd` 进去, 这就是我们新建的名为 `hello_cargo` 的项目了.

此时的目录结构:

```tree
.
├── .git
    └── ...
├── .gitignore
├── Cargo.toml
└── src
    └── main.rs
```

可见 Cargo 创建了不少东西.

`.gitignore`: 用于说明哪些内容应当被 Git 版本控制系统忽略, 主要针对之后生成内容的 `target/` 目录;

`.git/`: Git 仓库, 为隐藏目录;
:::tip
使用 `--vcs` 参数让 Cargo 初始化工作空间时不使用版本控制系统.
:::
`Cargo.toml`: 用于配置 Cargo 的一些包管理信息与工作空间信息. 包括工作空间名称, 版本号, 作者信息, Rust 版本, 以及第三方 crate 的版本;

`src/main.rs`: 我们的源码文件.
:::warning
注意 `Cargo.toml` 位于项目根目录, 而所有 `.rs` 源码均应当位于 `./src/` 目录下.
:::
:::tip
项目根目录还可以自行添加 `README.md` 自述文件, `LICENSE` 许可证文件, 或者其他需要的文件.
:::

### 初始化项目
也可以手动将项目转为 Cargo 项目:

1. 移动所有源码文件到 `./src/` 下;
1. 创建并手动填写 `Cargo.toml`;
1. (可选) 手动 `git init` 初始化 Git.
### 构建项目
执行命令:
```shell
cargo build
```
等待编译完成, 编译结果将位于:
::: tabs
== Windows
```powershell
.\target\debug\hello_cargo.exe
```
== Linux/WSL/MacOS
```shell
./target/debug/hello_cargo
```
:::
可以自行尝试运行.

首次运行 `cargo build` 将在根目录生成文件 `cargo.lock`, 用于详细追踪各种依赖的版本信息, 该文件需要保留, 无需更不应修改该文件, 如果采用了版本控制系统, 需要追踪该文件.

### 运行 Cargo 项目

除了手动探入 `target` 目录寻找可执行文件外, Cargo 提供了更方便的运行指令:
```shell
cargo run
```
该命令可以**构建并**运行当前项目, 如果已经生成过可执行文件, 且源代码没有本质更改, 该命令将直接运行项目.

::: tip
如果只是希望检查代码是否能够过编, 可以执行
```shell
cargo check
```
该命令将仅检查代码, 判断其能否通过编译, 但不生成任何可执行文件.
:::

### 构建发布版
```shell
cargo build --release
```
携带 `--release` 标签构建的内容将位于 `target/release` 下而非 `target/debug` 下, 且将以 release 形式完全重新编译 (如果第一次以 release 形式编译), 而非以不带参数的 dev 形式. 通过 release 形式编译的代码将会得到更精细的优化, 这意味着编译时长更久, 但二进制文件运行得更快.