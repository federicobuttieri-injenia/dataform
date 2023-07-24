config {
    type: "view",
    name: "input_partitions"
}

SELECT     DISTINCT PARSE_DATE("%Y%m%d", `partition`) AS date
FROM ${ref("PARTIZIONI_LOADJOB")}
WHERE 
    DATE(ts_lancio) >= CURRENT_DATE
AND table_name = 'S_LOG_CASE'