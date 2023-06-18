#!/bin/bash

echo ${API_URL}

sed -i 's|API_URL|'${API_URL}'|g' /usr/share/nginx/html/assets/index*.js

nginx -g "daemon off;"
