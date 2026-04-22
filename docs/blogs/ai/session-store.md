## sessionstore
会话持久化存储
会话元数据是指描述会话本身属性、而不属于对话内容本身的数据。
断点续跑、团队协作、调试重现
```
保存会话到文件（原子写入）
从文件恢复会话
环境一致性检查
会话列表管理
输入：文件存储路径
save: 保存会话（Agent配置信息，消息历史列表，工具Schema，会话元数据，Read工具的元数据缓存）原子写入+临时文件（json.dump+os.replace）
load:加载会话（json.load）
list_sessions:列出所有的会话（dir.glob("*.json")）
delete：删除会话
check_config_consistency:检查一致性
check_tool_schema_consistency:检查工具Schema一致性
// 会话文件结构
{
  "session_id": "s-20250119-a3f2d8e1",
  "created_at": "2025-01-19T10:30:45Z",
  "saved_at": "2025-01-19T10:45:10Z",
  
  "agent_config": {
    "name": "assistant",
    "agent_type": "ReActAgent",
    "llm_provider": "openai",
    "llm_model": "gpt-4",
    "max_steps": 10
  },
  
  "history": [
    {
      "role": "user",
      "content": "请分析这个仓库的架构",
      "timestamp": "2025-01-19T10:30:45Z"
    },
    {
      "role": "assistant",
      "content": "好的，我来分析...",
      "timestamp": "2025-01-19T10:31:00Z"
    }
  ],
  
  "tool_schema_hash": "a3f2d8e1",
  
  "read_cache": {
    "src/main.py": {
      "file_mtime_ms": 1738245123456,
      "file_size_bytes": 4217
    }
  },
  
  "metadata": {
    "created_at": "2025-01-19T10:30:45Z",
    "total_tokens": 43500,
    "total_steps": 25,
    "duration_seconds": 877
  }
}
```
