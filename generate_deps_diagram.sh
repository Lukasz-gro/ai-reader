#! /usr/bin/env bash

depcruise src \
  --include-only '^src' \
  --output-type mermaid > docs/deps.mmd && \
mmdc \
  --configFile mermaid-config.json \
  -i docs/deps.mmd \
  -o docs/deps.svg
