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
        { text: '手动逆向', link: '/other/reverse/ManualReverse/ManualReverse' },
        { text: '一键格式转换后如何导入 Blender', link: '/other/reverse/ImportToBlender/ImportToBlender' },
        { text: '排除并筛选正确的数据类型', link: '/other/reverse/FilterDataTypes/FilterDataTypes' },
        { text: 'Mod模型里没有脸部模型?', link: '/other/reverse/NoFaceModel/NoFaceModel' },
        { text: 'MMT常见问题', link: '/other/reverse/MMTFAQ/MMTFAQ' },
        { text: '四种Mod逆向方式区别', link: '/other/reverse/ReverseMethodComparison/ReverseMethodComparison' },
        { text: '骨骼: 逆向出来自带骨骼', link: '/other/reverse/ReverseWithBones/ReverseWithBones' },
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
        { text: '贴图通道详解与生成提示词', link: '/games/efmi/TextureChannelGuide/TextureChannelGuide' },
        { text: '贴图通道社区简表', link: '/games/efmi/TextureChannels/TextureChannels' },
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
        { text: '贴图通道详解与生成提示词', link: '/games/wwmi/TextureChannelGuide/TextureChannelGuide' },
        { text: '版本更新后贴图炸裂修复', link: '/games/wwmi/HowToFixTextureBug/HowToFixTextureBug' }
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
        { text: '导入FBX后如何删除Animation', link: '/blender/RemoveFBXAnimation/RemoveFBXAnimation' },
        { text: '姿态控制', link: '/blender/PoseControl/PoseControl' },
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
