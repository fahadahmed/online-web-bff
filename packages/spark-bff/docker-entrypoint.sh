#!/bin/sh
HOST_ID=$(cat /proc/self/cgroup | head -1 | awk -F '/' '{print $NF}' | awk -F '-' '{print $2}' | cut -c 1-12) ; if [ -z $HOST_ID ]; then HOST_ID=$(cat /proc/self/cgroup | head -1 | awk -F '/' '{print $NF}' | cut -c 1-12) ; fi ; export APPDYNAMICS_AGENT_UNIQUE_HOST_ID=$HOST_ID && export NODE_OPTIONS="--max-http-header-size=12000" && PORT="3001" && node build/index.cjs.js
