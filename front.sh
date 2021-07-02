#! /bin/bash

# 定义工作目录
WORK_DIR='/root/project/front'

# 进入工作目录
echo "进入工作目录：$WORK_DIR"
cd $WORK_DIR

# 拉取最新代码
echo "拉取最新代码"
git pull

# 前端代码构建
echo "前端代码构建"
cnpm run build

# docker镜像构建
echo "docker镜像构建"
docker build -t front:1.0 .

# docker旧容器清除
echo "docker旧容器清除"
docker container stop front
docker container rm front

# docker新容器生成
echo "docker新容器生成"
docker container run --name front -d -p 80:80 front:1.0
