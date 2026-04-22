# Skills介紹
知识外化系统，将特定领域知识写成独立的md文件。

## Skills加载器
实现渐进式披露机制
```
启动时加载元数据
需要时加载完整技能
skills_cache:完整技能body缓存
metadata_cache:技能元数据缓存
_scan_skills:扫描技能目录，加载yaml元数据
_parse_frontmatter_only:仅解析yaml元数据，不加载md内容
get_desc:获取所有技能的描述信息。（用于系统提示词）
get_skill：按需加载完整技能（缓存，验证一致性）
list_skills:列出所有技能名称
reload:重新加载技能（清除缓存，重新扫描）
```

## Skill Tool
按需加载领域知识
```
渐进式披露，仅在需要时加载完整技能。
缓存友好，作为tool_result注入，不修改system prompt
资源提示
参数替换
run：执行技能加载
```


