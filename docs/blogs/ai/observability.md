# TraceLogger
双格式Trace记录器
TraceLogger 是 Agent 的“黑匣子记录仪”——记录每一步的输入、输出、耗时、token 消耗，生成 JSON（供程序分析）和 HTML（供人查看）两种格式，用于调试和性能优化。
```
session_id：会话id
_generate_session_id:生成会话id
jsonl_path
html_path
jsonl_file
html_file
sanitize
_events:事件缓存
log_event:记录事件，
_sanitize_event:脱敏敏感信息
finalize:生成最终的html并关闭文件
_compute_stats:计算统计数据（会话时长，步骤数，Token统计，工具调用统计，错误统计）
_write_html_header:写入html头部
_write_html_event:写入单个事件的HTML片段（增量写入）
_write_html_footer:写入html尾部（统计面板+脚本）
```