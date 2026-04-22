# 上下文工程
提示工程关注如何编写与组织 LLM 的指令以获得更优结果；而上下文工程则是在推理阶段，如何策划与维护“最优的信息集合（tokens）”，其中不仅包含提示本身，还包含其他会进入上下文窗口的一切信息。

## HistoryManager
历史消息管理器
消息追加（只追加，不编辑）
历史压缩（生成summary+保留最近轮次）
会话序列化/反序列化
轮次边界检测
```
min_retain_rounds:最小完整轮次
append:追加消息，只追加，不编辑
get_history:获取历史副本
clear:清空历史
estimate_rounds:预估完整轮次，一轮定义：1 User消息+N条assistant/tool/summary消息
find_round_boundaries:查找每轮的起始索引
compress:将旧历史替换为summary消息，保留最近N轮完整对话
to_dict
from_dict
```

## TokenCounter
Token计数器
TokenCounter 在 Agent 工作期间采用“关键节点触发 + 缓存增量更新”模式，在压缩或修改历史时全量重算。
本地预估token数
缓存机制（避免重复计算）
增量计算（只计算新消息）
降级方案（tiktoken不可用时使用字符估算）
```
_get_encoding:获取tiktoken编码器（encoding_for_model，根据模型获取编码器），通用的cl100k_base
count_messages:计算消息列表的token数
count_message:计算单挑信息的token数，带缓存，角色标记（4token）
count_text:计算文本的Token数
_count_text:使用tiktoken计算token len(encode(text))，降级（len）
clear_cache:清除缓存
get_cache_size:获取缓存大小
```

## ObservationTruncator
工具输出截断器
工具输出截断器是上下文工程中的“保险丝”——用低成本、确定性的方式防止单个工具输出烧穿 token 预算，同时尽量保留开头和结尾的关键信息。
```
max_lines:最大行数
max_bytes:最大字节数
truncate:截断工具输出（str.splitlines()根据换行符分割字符串）
truncate_lines:根据方向截断
_save_full_output:保存完整输出到文件（json.dump）
```

## 上下文工程
Gather:多源收集候选信息（历史、工具结果）
Select:基于优先级、相关性、多样性筛选
Structure:组织成结构化上下文模板
Compress:在预算内压缩与规范化
```
ContextPacket:上下文信息包
ContextConfig:上下文构建配置
ContextBuilder:上下文构建器（tiktoken.get_encoding('cl100k_base')）
build:构建完整上下文（GSSC用户输入，对话历史、系统指令、记忆系统、RAG系统、额外的上下文包）
_gather:系统指令强约束，对话历史只保留最近N条，添加额外包
_select:基于分数与预算的筛选（相关性，关键字重叠，新进性，指数衰减，计算复合分0.7*相关性+0.3*新进性，区分出系统指令，依据最小相关性阈值过滤，根据剩余token数量，按排序靠前的进行填充）
_structure:组织成结构化上下文模板（系统指令，当前任务，任务状态（进展+未解决问题）、事实证据（记忆、rag知识，工具输出）、辅助材料（历史），输出）
_compress:压缩（截断，LLM总结）
```