#! /bin/bash

# 定义工作目录
WORK_DIR='/root/project/back'
# 进入工作目录
echo "进入工作目录$WORK_DIR"
cd $WORK_DIR

# 拉取新代码
echo "拉取新代码"
git pull

# 构建新镜像
echo "构建新镜像"
docker build -t back:1.0 .

# 清除旧容器
echo "清除旧容器"
docker container stop back
docker container rm back

# 生成新容器
echo "生成新容器"
docker container run --name back -d -p 3000:3000 back:1.0
