# 数据字典

合成记录采用 UTF-8 JSON 数组。主键和字段名称见 `manifest.json`。空值为来源未提供。

日期为当地自然日，截止日含当天，最小成熟期按投诉收到日到截止日的天数计算。valid 是独立盲审核实的真实消费反馈，invalid 是证据确认并非真实消费反馈。reviewed 表示送人工，limited 表示实际限制展示。班次额度由同城分层共享。这里不提供外部平台连接或评论内容。

- `assignments.json`　随机化单位为共用班次的门店组，arm 为原政策，fallback 为当期有降级。
- `complaints.json`　投诉收到日期、是否被策略送人工、申诉结果、是否实际限制展示、实际排序策略。
- `blind.json`　独立质控盲样的入样概率、结论、获悉日及撤回引用。pending/disputed/withdrawn 均未形成可用真值。
- `windows.json`　每个城市可用班次小时、已承诺小时和评审截面。
- `guardrails.json`　小门店漏审增量与误处置增量的最大容许值及抽审工时。
- `decisions.json`　已经有签字的试点范围和当时的资料截面。
