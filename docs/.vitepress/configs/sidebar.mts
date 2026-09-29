import type { DefaultTheme } from 'vitepress'

export const sidebar: DefaultTheme.Config['sidebar'] = {

  '/newbie/MMT/': [
    {
      text: 'MMT',
      items: [
        { text: '什么是VSCheck', link: '/newbie/MMT/WhatIsVSCheck/WhatIsVSCheck' },
        //CantUse3DmigotoInjector
        { text: '无法使用3Dmigoto注入器?', link: '/newbie/MMT/CantUse3DmigotoInjector/CantUse3DmigotoInjector' },
        //无法注入3Dmigoto
        { text: '无法注入3Dmigoto?', link: '/newbie/MMT/CantInject3Dmigoto/CantInject3Dmigoto' },
        { text: '找不到数据类型', link: '/newbie/MMT/CantFindDataType/CantFindDataType' },
        { text: '提取模型有多个数据类型', link: '/newbie/MMT/ExtractMultipleGameType/ExtractMultipleGameType' },
        { text: 'Dump文件过大处理', link: '/newbie/MMT/DumpFileTooHuge/DumpFileTooHuge' },
      ]
    }
  ],
  '/newbie/MIMIBlender/': [
    {
      text: 'MIMIBlender',
      items: [
        { text: '基础信息', link: '/newbie/MIMIBlender/BaseInfo/BaseInfo' },
        { text: '投影TEXCOORD2.xy', link: '/newbie/MIMIBlender/ProjectTEXCOORD2/ProjectTEXCOORD2' },
        { text: '平滑法线存TEXCOORD1.xy', link: '/newbie/MIMIBlender/SmoothNormalToTEXCOORD1/SmoothNormalToTEXCOORD1' },
        { text: '模型细分后权重问题', link: '/newbie/MIMIBlender/SubdivisionWeightIssue/SubdivisionWeightIssue' },
        //SwitchAndToggle
        { text: '蓝图实现按键开关和按键切换', link: '/newbie/MIMIBlender/SwitchAndToggle/SwitchAndToggle' },
      ]
    }
  ],
  '/newbie/tools/': [
    {
      text: '常用工具',
      items: [
        { text: 'ComfyUI贴图工作流', link: '/newbie/tools/ComfyUITexture/ComfyUITexture' },
        { text: 'Paint.NET工具介绍', link: '/newbie/tools/PaintDotNet/PaintDotNet' },
        { text: 'Paint.NET Modify Channels插件', link: '/newbie/tools/ModifyChannelPlugin/ModifyChannelPlugin' },
        { text: 'PhotoShop', link: '/newbie/tools/PhotoShop/PhotoShop' },
        { text: 'Substance 3D Painter', link: '/newbie/tools/Substance3DPainter/Substance3DPainter' },
      ]
    }
  ],
  '/newbie/faq/': [
    {
      text: '常见问题',
      items: [
        { text: '基础信息', link: '/newbie/faq/BaseInfo/BaseInfo' },
        { text: '常用办公软件在哪下载', link: '/newbie/faq/WhereGetSoftware/WhereGetSoftware' },
        { text: '模型从哪里获取', link: '/newbie/faq/WhereGetModels/WhereGetModels' },
        
      ]
    }
  ],
  '/other/reverse/': [
    {
      text: 'Mod逆向',
      items: [
        { text: '功能介绍', link: '/other/reverse/Welcome/Welcome' },
        { text: 'MMT介绍', link: '/other/reverse/MMTIntroduction/MMTIntroduction' },
        { text: 'MMT激活方式', link: '/other/reverse/MMTActivation/MMTActivation' },
        { text: '形态键面板Mod格式转换演示', link: '/other/reverse/ShapeKeyPanelModDemo/ShapeKeyPanelModDemo' },
        { text: 'Mod的模型如何绑定骨骼？', link: '/other/reverse/BindModModelBone/BindModModelBone' },
        { text: '原神脸部Mod逆向', link: '/other/reverse/GenshinFaceModReverse/GenshinFaceModReverse' },
        { text: '米游系列游戏原本解包骨骼', link: '/other/reverse/HoyoUnpackedBone/HoyoUnpackedBone' },
        { text: '手动逆向', link: '/other/reverse/ManualReverse/ManualReverse' },
        { text: '一键格式转换后如何导入 Blender', link: '/other/reverse/ImportToBlender/ImportToBlender' },
        { text: '排除并筛选正确的数据类型', link: '/other/reverse/FilterDataTypes/FilterDataTypes' },
        { text: 'Mod模型里没有脸部模型?', link: '/other/reverse/NoFaceModel/NoFaceModel' },
        { text: 'MMT常见问题', link: '/other/reverse/MMTFAQ/MMTFAQ' },
        { text: '四种Mod逆向方式区别', link: '/other/reverse/ReverseMethodComparison/ReverseMethodComparison' },
        { text: '萌新常见问题', link: '/other/reverse/FAQ/FAQ' },
        { text: '骨骼: 模型绑定骨骼', link: '/other/reverse/BindModelToBone/BindModelToBone' },
        { text: '骨骼: 米游游戏原骨骼绑骨', link: '/other/reverse/HoyoGamesBone/HoyoGamesBone' },
        { text: '骨骼: 鸣潮原骨骼绑骨', link: '/other/reverse/WutheringWavesBone/WutheringWavesBone' },
      ]
    }
  ],
  '/other/gimierror/': [
    {
      text: '原神',
      items: [
        { text: '10612-4001报错', link: '/other/gimierror/GenshinImpactError/GenshinImpactError' },
      ]
    }
  ],
  '/games/gimi/': [
    {
      text: '原神',
      items: [
        { text: '基础信息', link: '/games/gimi/BaseInfo/BaseInfo' },
        { text: '颜色不匹配问题', link: '/games/gimi/ColorMismatch/ColorMismatch' },
        { text: '脸部隐藏问题', link: '/games/gimi/FaceHidingIssue/FaceHidingIssue' },
        { text: 'Mod扭曲或失效', link: '/games/gimi/ModDistortion/ModDistortion' },
        { text: 'Mod边缘剧烈抖动', link: '/games/gimi/ModIsShaking/ModIsShaking' },
        { text: 'OR Fix与NN Fix', link: '/games/gimi/ORFixAndNNFix/ORFixAndNNFix' },
        { text: '轮廓线修复', link: '/games/gimi/OutlineFix/OutlineFix' },
      ]
    }
  ],
  '/games/srmi/': [
    {
      text: '崩坏:星穹铁道',
      items: [
        { text: '基础信息', link: '/games/srmi/BaseInfo/BaseInfo' },
        { text: '无法导出完整角色体型', link: '/games/srmi/CantDumpFullBody/CantDumpFullBody' },
        { text: '动作Mod崩溃或异常', link: '/games/srmi/ActionModCrash/ActionModCrash' },
        { text: 'AI插针导致Mod炸裂', link: '/games/srmi/AIBrokeMods/AIBrokeMods' },
        { text: '动态Mod轮廓线闪烁', link: '/games/srmi/DynamicModOutlineGlitch/DynamicModOutlineGlitch' },
        { text: '无法正常提取模型', link: '/games/srmi/HowToDump/HowToDump' },
        { text: '轮廓线修复', link: '/games/srmi/OutlineFix/OutlineFix' },
        { text: '槽位风格贴图问题', link: '/games/srmi/SlotStyleTextureProblem/SlotStyleTextureProblem' },
        { text: '匹诺康尼贴图问题', link: '/games/srmi/TextureSlotIssue/TextureSlotIssue' },
        { text: 'UV2解析', link: '/games/srmi/WhatIsUV2/WhatIsUV2' },
        { text: '黄边问题修复', link: '/games/srmi/YellowOutlineFix/YellowOutlineFix' },
        { text: '崩铁SP刃无法正常制作', link: '/games/srmi/RenBrokenDisappear/RenBrokenDisappear' }

      ]
    }
  ],
  '/games/efmi/': [
    //D3dxIniChanges
    {
      text: '明日方舟:终末地',
      items: [
        { text: '基础信息', link: '/games/efmi/BaseInfo/BaseInfo' },
        { text: 'd3dx.ini特殊变更', link: '/games/efmi/D3dxIniChanges/D3dxIniChanges' },
        { text: '贴图通道作用', link: '/games/efmi/TextureChannels/TextureChannels' },
        { text: '如何注入3Dmigoto', link: '/games/efmi/HowToConfigAndInject/HowToConfigAndInject' },
        { text: '头发生成Mod后炸裂', link: '/games/efmi/HairModBroken/HairModBroken' },
        { text: 'Hash风格贴图无法生效', link: '/games/efmi/HashStyleTextureNotWork/HashStyleTextureNotWork' }
      ]
    }
  ],
  '/games/yysls/': [
    {
      text: '燕云十六声',
      items: [
        { text: '基础信息', link: '/games/yysls/BaseInfo/BaseInfo' },
        { text: 'YYSLS基础配置', link: '/games/yysls/BasicConfig/BasicConfig' },
        { text: '多个游戏主程序问题', link: '/games/yysls/InjectionIssue/InjectionIssue' }
      ]
    }
  ],
  '/games/gf2/': [
    {
      text: '少女前线2:追放',
      items: [
        { text: '基础信息', link: '/games/gf2/BaseInfo/BaseInfo' },
        { text: '模型删减与偏移', link: '/games/gf2/ModelReductionAndOffset/ModelReductionAndOffset' }
      ]
    }
  ],
  '/games/himi/': [
    {
      text: '崩坏3',
      items: [
        { text: '基础信息', link: '/games/himi/BaseInfo/BaseInfo' },
        { text: '轮廓线修复', link: '/games/himi/OutlineFix/OutlineFix' },
        { text: 'Second UV Map用途', link: '/games/himi/SecondUVMapUsage/SecondUVMapUsage' }
      ]
    }
  ],
  '/games/identityv/': [
    {
      text: '第五人格',
      items: [
        { text: '基础信息', link: '/games/identityv/BaseInfo/BaseInfo' },
        { text: 'Mod制作指引', link: '/games/identityv/ModCreationGuide/ModCreationGuide' },
        { text: '新版Mod制作基础', link: '/games/identityv/NeoX3Guide/NeoX3Guide' }
      ]
    }
  ],
  '/games/liarsbar/': [
    {
      text: 'Liar\'s Bar',
      items: [
        { text: '基础信息', link: '/games/liarsbar/BaseInfo/BaseInfo' },
        { text: '手枪模型问题', link: '/games/liarsbar/PistolModelIssue/PistolModelIssue' }
      ]
    }
  ],
  '/games/wwmi/': [
    {
      text: '鸣潮',
      items: [
        { text: '基础信息', link: '/games/wwmi/BaseInfo/BaseInfo' },
        { text: '版本更新后贴图炸裂修复', link: '/games/wwmi/HowToFixTextureBug/HowToFixTextureBug' },
        { text: '一键启动路径配置', link: '/games/wwmi/ProcessPathConfig/ProcessPathConfig' }
      ]
    }
  ],
  '/games/ntemi/': [
    {
      text: '异环',
      items: [
        { text: '相关介绍', link: '/games/ntemi/BaseInfo/BaseInfo' },
      ]
    }
  ],
  '/games/naraka/': [
    {
      text: '永劫无间',
      items: [
        { text: '基础信息', link: '/games/naraka/BaseInfo/BaseInfo' },
        { text: '蓝图节点:快速跨IB渲染', link: '/games/naraka/FastCrossIBRender/FastCrossIBRender' },
      ]
    }
  ],
  '/games/zzmi/': [
    {
      text: '绝区零',
      items: [
        { text: '基础信息', link: '/games/zzmi/BaseInfo/BaseInfo' },
        { text: '爱丽丝的剑消失问题', link: '/games/zzmi/AliceSwordDisappear/AliceSwordDisappear' },
        { text: '上下身体分开问题', link: '/games/zzmi/BodySeparationIssue/BodySeparationIssue' },
        { text: '禁用动态高精度', link: '/games/zzmi/DisableDynamicHighPrecision/DisableDynamicHighPrecision' },
        { text: 'FakeHair问题', link: '/games/zzmi/FakeHairIssue/FakeHairIssue' },
        { text: '法线贴图错误', link: '/games/zzmi/NormalMapError/NormalMapError' },
        { text: '完美阴影与轮廓线', link: '/games/zzmi/PerfectShadowAndOutline/PerfectShadowAndOutline' },
        { text: '教程: 提取模型', link: '/games/zzmi/T001ExtractModel/T001ExtractModel' },
        { text: '教程: 准备篇', link: '/games/zzmi/T002Preparation/T002Preparation' },
        { text: '教程: 基础调整篇', link: '/games/zzmi/T003BasicAdjustments/T003BasicAdjustments' },
        { text: '教程: 拆分MMD模型', link: '/games/zzmi/T004SplitMMD/T004SplitMMD' },
        { text: '教程: 原模型处理篇', link: '/games/zzmi/T005ProcessOriginal/T005ProcessOriginal' },
        { text: '教程: 顶点组自动改名篇', link: '/games/zzmi/T006VertexGroupRenaming/T006VertexGroupRenaming' },
        { text: '教程: 合并篇', link: '/games/zzmi/T007Merging/T007Merging' },
        { text: '教程: 顶点组处理篇', link: '/games/zzmi/T008Finalizing/T008Finalizing' },
        { text: '教程: 生成Mod与贴图篇', link: '/games/zzmi/T009GenerateMod/T009GenerateMod' },
        { text: '教程: 处理贴图大小问题', link: '/games/zzmi/T010ProcessTextureProblem/T010ProcessTextureProblem' }
      ]
    }

  ],
  '/': [
    {
      text: '前方的区域，以后再来探索吧'
    }
  ],
  '/blender/':[
    {
      text: 'Blender',
      items: [
        { text: '如何实时查看顶点数量', link: '/blender/AlwaysSeeVertexNumber/AlwaysSeeVertexNumber' },
        { text: 'F2 Addon', link: '/blender/F2Addon/F2Addon' },
        { text: 'Fluid Painter NSFW', link: '/blender/FluidPainter/FluidPainter' },
        { text: 'Handy Weight Edit', link: '/blender/HandyWeightEdit/HandyWeightEdit' },
        { text: '反细分来减少边对接顶点数', link: '/blender/JieTouBaWang/JieTouBaWang' },
        { text: 'LEOAlphaPaint', link: '/blender/LEOAlphaPaint/LEOAlphaPaint' },
        { text: 'Material Combiner插件', link: '/blender/MaterialCombiner/MaterialCombiner' },
        { text: 'MikuMikuDance插件', link: '/blender/MikuMikuDance/MikuMikuDance' },
        { text: 'MikuMikuRig插件', link: '/blender/MikuMikuRig/MikuMikuRig' },
        { text: '撤销次数一定要拉高', link: '/blender/MoreCtrlZSteps/MoreCtrlZSteps' },
        { text: '删除骨骼约束', link: '/blender/RemoveBoneConstraints/RemoveBoneConstraints' },
        { text: '去掉启动时的卡片', link: '/blender/RemoveStartTips/RemoveStartTips' },
        { text: '恢复默认布局', link: '/blender/RestoreDefaultLayout/RestoreDefaultLayout' },
        { text: 'Screenshot Keys插件', link: '/blender/ScreenshotKeys/ScreenshotKeys' },
        { text: '如何选择一圈的边', link: '/blender/SelectEdge/SelectEdge' },
        { text: '按C刷选面或顶点', link: '/blender/SelectFaceOrVertex/SelectFaceOrVertex' },
        { text: '传递UV映射', link: '/blender/TransferUV/TransferUV' },
        { text: 'Vertex Color Master', link: '/blender/VertexColorMaster/VertexColorMaster' },
        { text: '决定系统使用哪个版本打开.blend文件', link: '/blender/WhichBlenderToOpen/WhichBlenderToOpen' },
      ]
    }
  ],
  '/migoto/':[
    {
      text: '3Dmigoto',
      items: [
        { text: '3Dmigoto简介', link: '/migoto/Introduction/Introduction' },
        { text: '解压安装3Dmigoto', link: '/migoto/ManualModInstallation/ManualModInstallation' },
        { text: '手游上使用3Dmigoto', link: '/migoto/MobileUsage/MobileUsage' },
        { text: '默认顶点数量突破问题', link: '/migoto/Extra_VertexNumberRaise/Extra_VertexNumberRaise' },
        { text: '跨IB渲染教程', link: '/migoto/CrossIBRendering/CrossIBRendering' },
        { text: '跨IB渲染后接缝对不上', link: '/migoto/CrossIBButWrongBody/CrossIBButWrongBody' },
        { text: '新版NVIDIA驱动无法注入', link: '/migoto/DriverInjectionIssue/DriverInjectionIssue' },
        { text: 'Dump导致游戏卡死', link: '/migoto/DumpUntilGameQuit/DumpUntilGameQuit' },
        { text: '通过贴图找IB Hash', link: '/migoto/FindIBHashByTexture/FindIBHashByTexture' },
        { text: '如何获取技能Hash', link: '/migoto/HowToGetHashForSkill/HowToGetHashForSkill' },
        { text: '如何合并多个Mod', link: '/migoto/HowToCombineMod/HowToCombineMod' },
        { text: '模型单面贴图问题', link: '/migoto/ModelSingleTextureProblem/ModelSingleTextureProblem' },
        { text: '没有小键盘如何使用Hunting', link: '/migoto/NoNumpadHunting/NoNumpadHunting' },
        { text: 'SmoothMotion不兼容问题', link: '/migoto/SmoothMotionIncompatibility/SmoothMotionIncompatibility' },
        { text: '贴图格式导致色差问题', link: '/migoto/TextureFormatProblem/TextureFormatProblem' },
        { text: '3Dmigoto常用链接', link: '/migoto/UsefulLinks/UsefulLinks' },
      ]
    }
  ]
}
