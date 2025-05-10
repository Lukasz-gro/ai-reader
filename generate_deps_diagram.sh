#! /usr/bin/env bash

mkdir -p ./docs

depcruise src \
  --include-only '^src' \
  --output-type mermaid > docs/deps.mmd && \
mmdc \
  --configFile mermaid-config.json \
  -i docs/deps.mmd \
  -o docs/deps.svg
