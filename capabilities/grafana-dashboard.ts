// const configMapBody = {
//   apiVersion: 'v1',
//   data: {
//     'file.json': 
//         '{\n' +
//     '"dashboard": {\n' +
//     '    "annotations": {\n' +
//     '      "list": [\n' +
//     '        {\n' +
//     '          "builtIn": 1,\n' +
//     '          "datasource": {\n' +
//     '            "type": "datasource",\n' +
//     '            "uid": "grafana"\n' +
//     '          },\n' +
//     '          "enable": true,\n' +
//     '          "hide": true,\n' +
//     '          "iconColor": "rgba(0, 211, 255, 1)",\n' +
//     '          "name": "Annotations & Alerts",\n' +
//     '          "target": {\n' +
//     '            "limit": 100,\n' +
//     '            "matchAny": false,\n' +
//     '            "tags": [],\n' +
//     '            "type": "dashboard"\n' +
//     '          },\n' +
//     '          "type": "dashboard"\n' +
//     '        }\n' +
//     '      ]\n' +
//     '    },\n' +
//     '    "editable": true,\n' +
//     '    "fiscalYearStartMonth": 0,\n' +
//     '    "graphTooltip": 0,\n' +
//     '    "id": null,\n' +
//     '    "links": [],\n' +
//     '    "liveNow": false,\n' +
//     '    "panels": [\n' +
//     '      {\n' +
//     '        "datasource": {\n' +
//     '          "type": "Prometheus",\n' +
//     '          "uid": "Prometheus"\n' +
//     '        },\n' +
//     '        "description": "",\n' +
//     '        "fieldConfig": {\n' +
//     '          "defaults": {\n' +
//     '            "color": {\n' +
//     '              "mode": "palette-classic"\n' +
//     '            },\n' +
//     '            "custom": {\n' +
//     '              "axisCenteredZero": false,\n' +
//     '              "axisColorMode": "text",\n' +
//     '              "axisLabel": "% of CPU Limit Used",\n' +
//     '              "axisPlacement": "auto",\n' +
//     '              "barAlignment": 0,\n' +
//     '              "drawStyle": "line",\n' +
//     '              "fillOpacity": 0,\n' +
//     '              "gradientMode": "none",\n' +
//     '              "hideFrom": {\n' +
//     '                "legend": false,\n' +
//     '                "tooltip": false,\n' +
//     '                "viz": false\n' +
//     '              },\n' +
//     '              "lineInterpolation": "linear",\n' +
//     '              "lineWidth": 1,\n' +
//     '              "pointSize": 5,\n' +
//     '              "scaleDistribution": {\n' +
//     '                "type": "linear"\n' +
//     '              },\n' +
//     '              "showPoints": "auto",\n' +
//     '              "spanNulls": false,\n' +
//     '              "stacking": {\n' +
//     '                "group": "A",\n' +
//     '                "mode": "none"\n' +
//     '              },\n' +
//     '              "thresholdsStyle": {\n' +
//     '                "mode": "off"\n' +
//     '              }\n' +
//     '            },\n' +
//     '            "mappings": [],\n' +
//     '            "thresholds": {\n' +
//     '              "mode": "absolute",\n' +
//     '              "steps": [\n' +
//     '                {\n' +
//     '                  "color": "green",\n' +
//     '                  "value": null\n' +
//     '                },\n' +
//     '                {\n' +
//     '                  "color": "red",\n' +
//     '                  "value": 80\n' +
//     '                }\n' +
//     '              ]\n' +
//     '            },\n' +
//     '            "unit": "percent"\n' +
//     '          },\n' +
//     '          "overrides": []\n' +
//     '        },\n' +
//     '        "gridPos": {\n' +
//     '          "h": 9,\n' +
//     '          "w": 12,\n' +
//     '          "x": 0,\n' +
//     '          "y": 0\n' +
//     '        },\n' +
//     '        "id": 2,\n' +
//     '        "options": {\n' +
//     '          "legend": {\n' +
//     '            "calcs": [],\n' +
//     '            "displayMode": "list",\n' +
//     '            "placement": "bottom",\n' +
//     '            "showLegend": true\n' +
//     '          },\n' +
//     '          "tooltip": {\n' +
//     '            "mode": "single",\n' +
//     '            "sort": "none"\n' +
//     '          }\n' +
//     '        },\n' +
//     '        "targets": [\n' +
//     '          {\n' +
//     '            "datasource": {\n' +
//     '              "type": "Prometheus",\n' +
//     '              "uid": "Prometheus"\n' +
//     '            },\n' +
//     '            "editorMode": "code",\n' +
//     '            "exemplar": true,\n' +
//     '            "expr": "(sum(rate(container_cpu_usage_seconds_total{namespace=~\"${Namespace}\",container!=\"POD\",container!=\"istio-proxy\"}[5m])) by (namespace,container) / sum(kube_pod_container_resource_limits{resource=\"cpu\",namespace=~\"${Namespace}\",container!=\"POD\",container!=\"istio-proxy\"}) by (namespace,container) ) * 100",\n' +
//     '            "interval": "",\n' +
//     '            "legendFormat": "{container:{{container}}, pod:{{pod}}, namespace:{{namespace}} }",\n' +
//     '            "range": true,\n' +
//     '            "refId": "A"\n' +
//     '          }\n' +
//     '        ],\n' +
//     '        "title": "% of CPU Limit Used by Containers (Over Time)",\n' +
//     '        "type": "timeseries"\n' +
//     '      },\n' +
//     '      {\n' +
//     '        "datasource": {\n' +
//     '          "type": "Prometheus",\n' +
//     '          "uid": "Prometheus"\n' +
//     '        },\n' +
//     '        "fieldConfig": {\n' +
//     '          "defaults": {\n' +
//     '            "color": {\n' +
//     '              "mode": "palette-classic"\n' +
//     '            },\n' +
//     '            "custom": {\n' +
//     '              "axisCenteredZero": false,\n' +
//     '              "axisColorMode": "text",\n' +
//     '              "axisLabel": "% Memory Limit Used",\n' +
//     '              "axisPlacement": "auto",\n' +
//     '              "barAlignment": 0,\n' +
//     '              "drawStyle": "line",\n' +
//     '              "fillOpacity": 0,\n' +
//     '              "gradientMode": "none",\n' +
//     '              "hideFrom": {\n' +
//     '                "legend": false,\n' +
//     '                "tooltip": false,\n' +
//     '                "viz": false\n' +
//     '              },\n' +
//     '              "lineInterpolation": "linear",\n' +
//     '              "lineWidth": 1,\n' +
//     '              "pointSize": 5,\n' +
//     '              "scaleDistribution": {\n' +
//     '                "type": "linear"\n' +
//     '              },\n' +
//     '              "showPoints": "auto",\n' +
//     '              "spanNulls": false,\n' +
//     '              "stacking": {\n' +
//     '                "group": "A",\n' +
//     '                "mode": "none"\n' +
//     '              },\n' +
//     '              "thresholdsStyle": {\n' +
//     '                "mode": "off"\n' +
//     '              }\n' +
//     '            },\n' +
//     '            "mappings": [],\n' +
//     '            "thresholds": {\n' +
//     '              "mode": "absolute",\n' +
//     '              "steps": [\n' +
//     '                {\n' +
//     '                  "color": "green",\n' +
//     '                  "value": null\n' +
//     '                },\n' +
//     '                {\n' +
//     '                  "color": "red",\n' +
//     '                  "value": 80\n' +
//     '                }\n' +
//     '              ]\n' +
//     '            },\n' +
//     '            "unit": "percent"\n' +
//     '          },\n' +
//     '          "overrides": []\n' +
//     '        },\n' +
//     '        "gridPos": {\n' +
//     '          "h": 9,\n' +
//     '          "w": 12,\n' +
//     '          "x": 12,\n' +
//     '          "y": 0\n' +
//     '        },\n' +
//     '        "id": 4,\n' +
//     '        "options": {\n' +
//     '          "legend": {\n' +
//     '            "calcs": [],\n' +
//     '            "displayMode": "list",\n' +
//     '            "placement": "bottom",\n' +
//     '            "showLegend": true\n' +
//     '          },\n' +
//     '          "tooltip": {\n' +
//     '            "mode": "single",\n' +
//     '            "sort": "none"\n' +
//     '          }\n' +
//     '        },\n' +
//     '        "targets": [\n' +
//     '          {\n' +
//     '            "datasource": {\n' +
//     '              "type": "Prometheus",\n' +
//     '              "uid": "Prometheus"\n' +
//     '            },\n' +
//     '            "editorMode": "code",\n' +
//     '            "exemplar": true,\n' +
//     '            "expr": "(sum(container_memory_max_usage_bytes{namespace=~\"${Namespace}\",container!=\"POD\",container!=\"istio-proxy\"}) by (namespace,container) / sum(kube_pod_container_resource_limits{resource=\"memory\",namespace=~\"${Namespace}\",container!=\"POD\",container!=\"istio-proxy\"}) by (namespace,container))*100",\n' +
//     '            "interval": "",\n' +
//     '            "legendFormat": "{container:{{container}}, pod:{{pod}}, namespace:{{namespace}} }",\n' +
//     '            "range": true,\n' +
//     '            "refId": "A"\n' +
//     '          }\n' +
//     '        ],\n' +
//     '        "title": "% of Memory Limit Used by Containers (Over Time)",\n' +
//     '        "type": "timeseries"\n' +
//     '      },\n' +
//     '      {\n' +
//     '        "datasource": {\n' +
//     '          "type": "Prometheus",\n' +
//     '          "uid": "Prometheus"\n' +
//     '        },\n' +
//     '        "fieldConfig": {\n' +
//     '          "defaults": {\n' +
//     '            "color": {\n' +
//     '              "mode": "palette-classic"\n' +
//     '            },\n' +
//     '            "custom": {\n' +
//     '              "axisCenteredZero": false,\n' +
//     '              "axisColorMode": "text",\n' +
//     '              "axisLabel": "Bytes",\n' +
//     '              "axisPlacement": "auto",\n' +
//     '              "barAlignment": 0,\n' +
//     '              "drawStyle": "line",\n' +
//     '              "fillOpacity": 0,\n' +
//     '              "gradientMode": "none",\n' +
//     '              "hideFrom": {\n' +
//     '                "legend": false,\n' +
//     '                "tooltip": false,\n' +
//     '                "viz": false\n' +
//     '              },\n' +
//     '              "lineInterpolation": "linear",\n' +
//     '              "lineWidth": 1,\n' +
//     '              "pointSize": 5,\n' +
//     '              "scaleDistribution": {\n' +
//     '                "type": "linear"\n' +
//     '              },\n' +
//     '              "showPoints": "auto",\n' +
//     '              "spanNulls": false,\n' +
//     '              "stacking": {\n' +
//     '                "group": "A",\n' +
//     '                "mode": "none"\n' +
//     '              },\n' +
//     '              "thresholdsStyle": {\n' +
//     '                "mode": "off"\n' +
//     '              }\n' +
//     '            },\n' +
//     '            "mappings": [],\n' +
//     '            "thresholds": {\n' +
//     '              "mode": "absolute",\n' +
//     '              "steps": [\n' +
//     '                {\n' +
//     '                  "color": "green",\n' +
//     '                  "value": null\n' +
//     '                },\n' +
//     '                {\n' +
//     '                  "color": "red",\n' +
//     '                  "value": 80\n' +
//     '                }\n' +
//     '              ]\n' +
//     '            },\n' +
//     '            "unit": "decbytes"\n' +
//     '          },\n' +
//     '          "overrides": []\n' +
//     '        },\n' +
//     '        "gridPos": {\n' +
//     '          "h": 8,\n' +
//     '          "w": 12,\n' +
//     '          "x": 0,\n' +
//     '          "y": 17\n' +
//     '        },\n' +
//     '        "id": 8,\n' +
//     '        "options": {\n' +
//     '          "legend": {\n' +
//     '            "calcs": [],\n' +
//     '            "displayMode": "list",\n' +
//     '            "placement": "bottom",\n' +
//     '            "showLegend": true\n' +
//     '          },\n' +
//     '          "tooltip": {\n' +
//     '            "mode": "single",\n' +
//     '            "sort": "none"\n' +
//     '          }\n' +
//     '        },\n' +
//     '        "targets": [\n' +
//     '          {\n' +
//     '            "datasource": {\n' +
//     '              "type": "Prometheus",\n' +
//     '              "uid": "Prometheus"\n' +
//     '            },\n' +
//     '            "editorMode": "code",\n' +
//     '            "exemplar": true,\n' +
//     '            "expr": "container_fs_reads_bytes_total{namespace=~\"${Namespace}\",container!=\"POD\",container!=\"istio-proxy\"}",\n' +
//     '            "interval": "",\n' +
//     '            "legendFormat": "{container:{{container}}, pod:{{pod}}, namespace:{{namespace}} }",\n' +
//     '            "range": true,\n' +
//     '            "refId": "A"\n' +
//     '          }\n' +
//     '        ],\n' +
//     '        "title": "File System Reads by Container (Over Time)",\n' +
//     '        "type": "timeseries"\n' +
//     '      },\n' +
//     '      {\n' +
//     '        "datasource": {\n' +
//     '          "type": "Prometheus",\n' +
//     '          "uid": "Prometheus"\n' +
//     '        },\n' +
//     '        "fieldConfig": {\n' +
//     '          "defaults": {\n' +
//     '            "color": {\n' +
//     '              "mode": "palette-classic"\n' +
//     '            },\n' +
//     '            "custom": {\n' +
//     '              "axisCenteredZero": false,\n' +
//     '              "axisColorMode": "text",\n' +
//     '              "axisLabel": "Bytes",\n' +
//     '              "axisPlacement": "auto",\n' +
//     '              "barAlignment": 0,\n' +
//     '              "drawStyle": "line",\n' +
//     '              "fillOpacity": 0,\n' +
//     '              "gradientMode": "none",\n' +
//     '              "hideFrom": {\n' +
//     '                "legend": false,\n' +
//     '                "tooltip": false,\n' +
//     '                "viz": false\n' +
//     '              },\n' +
//     '              "lineInterpolation": "linear",\n' +
//     '              "lineWidth": 1,\n' +
//     '              "pointSize": 5,\n' +
//     '              "scaleDistribution": {\n' +
//     '                "type": "linear"\n' +
//     '              },\n' +
//     '              "showPoints": "auto",\n' +
//     '              "spanNulls": false,\n' +
//     '              "stacking": {\n' +
//     '                "group": "A",\n' +
//     '                "mode": "none"\n' +
//     '              },\n' +
//     '              "thresholdsStyle": {\n' +
//     '                "mode": "off"\n' +
//     '              }\n' +
//     '            },\n' +
//     '            "mappings": [],\n' +
//     '            "thresholds": {\n' +
//     '              "mode": "absolute",\n' +
//     '              "steps": [\n' +
//     '                {\n' +
//     '                  "color": "green",\n' +
//     '                  "value": null\n' +
//     '                },\n' +
//     '                {\n' +
//     '                  "color": "red",\n' +
//     '                  "value": 80\n' +
//     '                }\n' +
//     '              ]\n' +
//     '            },\n' +
//     '            "unit": "decbytes"\n' +
//     '          },\n' +
//     '          "overrides": []\n' +
//     '        },\n' +
//     '        "gridPos": {\n' +
//     '          "h": 8,\n' +
//     '          "w": 12,\n' +
//     '          "x": 12,\n' +
//     '          "y": 17\n' +
//     '        },\n' +
//     '        "id": 10,\n' +
//     '        "options": {\n' +
//     '          "legend": {\n' +
//     '            "calcs": [],\n' +
//     '            "displayMode": "list",\n' +
//     '            "placement": "bottom",\n' +
//     '            "showLegend": true\n' +
//     '          },\n' +
//     '          "tooltip": {\n' +
//     '            "mode": "single",\n' +
//     '            "sort": "none"\n' +
//     '          }\n' +
//     '        },\n' +
//     '        "targets": [\n' +
//     '          {\n' +
//     '            "datasource": {\n' +
//     '              "type": "Prometheus",\n' +
//     '              "uid": "Prometheus"\n' +
//     '            },\n' +
//     '            "editorMode": "code",\n' +
//     '            "exemplar": true,\n' +
//     '            "expr": "rate(container_fs_writes_bytes_total{namespace=~\"${Namespace}\",container!=\"POD\",container!=\"istio-proxy\"}[5m])",\n' +
//     '            "interval": "",\n' +
//     '            "legendFormat": "{container:{{container}}, pod:{{pod}}, namespace:{{namespace}} }",\n' +
//     '            "range": true,\n' +
//     '            "refId": "A"\n' +
//     '          }\n' +
//     '        ],\n' +
//     '        "title": "File System Writes by Container (Over Time)",\n' +
//     '        "type": "timeseries"\n' +
//     '      },\n' +
//     '      {\n' +
//     '        "datasource": {\n' +
//     '          "type": "Prometheus",\n' +
//     '          "uid": "Prometheus"\n' +
//     '        },\n' +
//     '        "fieldConfig": {\n' +
//     '          "defaults": {\n' +
//     '            "color": {\n' +
//     '              "mode": "palette-classic"\n' +
//     '            },\n' +
//     '            "custom": {\n' +
//     '              "axisCenteredZero": false,\n' +
//     '              "axisColorMode": "text",\n' +
//     '              "axisLabel": "Bytes",\n' +
//     '              "axisPlacement": "auto",\n' +
//     '              "barAlignment": 0,\n' +
//     '              "drawStyle": "line",\n' +
//     '              "fillOpacity": 0,\n' +
//     '              "gradientMode": "none",\n' +
//     '              "hideFrom": {\n' +
//     '                "legend": false,\n' +
//     '                "tooltip": false,\n' +
//     '                "viz": false\n' +
//     '              },\n' +
//     '              "lineInterpolation": "linear",\n' +
//     '              "lineWidth": 1,\n' +
//     '              "pointSize": 5,\n' +
//     '              "scaleDistribution": {\n' +
//     '                "type": "linear"\n' +
//     '              },\n' +
//     '              "showPoints": "auto",\n' +
//     '              "spanNulls": false,\n' +
//     '              "stacking": {\n' +
//     '                "group": "A",\n' +
//     '                "mode": "none"\n' +
//     '              },\n' +
//     '              "thresholdsStyle": {\n' +
//     '                "mode": "off"\n' +
//     '              }\n' +
//     '            },\n' +
//     '            "mappings": [],\n' +
//     '            "thresholds": {\n' +
//     '              "mode": "absolute",\n' +
//     '              "steps": [\n' +
//     '                {\n' +
//     '                  "color": "green",\n' +
//     '                  "value": null\n' +
//     '                },\n' +
//     '                {\n' +
//     '                  "color": "red",\n' +
//     '                  "value": 80\n' +
//     '                }\n' +
//     '              ]\n' +
//     '            },\n' +
//     '            "unit": "decbytes"\n' +
//     '          },\n' +
//     '          "overrides": []\n' +
//     '        },\n' +
//     '        "gridPos": {\n' +
//     '          "h": 8,\n' +
//     '          "w": 12,\n' +
//     '          "x": 0,\n' +
//     '          "y": 25\n' +
//     '        },\n' +
//     '        "id": 12,\n' +
//     '        "options": {\n' +
//     '          "legend": {\n' +
//     '            "calcs": [],\n' +
//     '            "displayMode": "list",\n' +
//     '            "placement": "bottom",\n' +
//     '            "showLegend": true\n' +
//     '          },\n' +
//     '          "tooltip": {\n' +
//     '            "mode": "single",\n' +
//     '            "sort": "none"\n' +
//     '          }\n' +
//     '        },\n' +
//     '        "targets": [\n' +
//     '          {\n' +
//     '            "datasource": {\n' +
//     '              "type": "Prometheus",\n' +
//     '              "uid": "Prometheus"\n' +
//     '            },\n' +
//     '            "editorMode": "code",\n' +
//     '            "exemplar": true,\n' +
//     '            "expr": "rate(container_network_receive_bytes_total{namespace=~\"${Namespace}\"}[5m])",\n' +
//     '            "interval": "",\n' +
//     '            "legendFormat": "{container:{{container}}, pod:{{pod}}, namespace:{{namespace}} }",\n' +
//     '            "range": true,\n' +
//     '            "refId": "A"\n' +
//     '          }\n' +
//     '        ],\n' +
//     '        "title": "Container Network Bytes Received (Over Time)",\n' +
//     '        "type": "timeseries"\n' +
//     '      },\n' +
//     '      {\n' +
//     '        "datasource": {\n' +
//     '          "type": "Prometheus",\n' +
//     '          "uid": "Prometheus"\n' +
//     '        },\n' +
//     '        "fieldConfig": {\n' +
//     '          "defaults": {\n' +
//     '            "color": {\n' +
//     '              "mode": "palette-classic"\n' +
//     '            },\n' +
//     '            "custom": {\n' +
//     '              "axisCenteredZero": false,\n' +
//     '              "axisColorMode": "text",\n' +
//     '              "axisLabel": "Bytes",\n' +
//     '              "axisPlacement": "auto",\n' +
//     '              "barAlignment": 0,\n' +
//     '              "drawStyle": "line",\n' +
//     '              "fillOpacity": 0,\n' +
//     '              "gradientMode": "none",\n' +
//     '              "hideFrom": {\n' +
//     '                "legend": false,\n' +
//     '                "tooltip": false,\n' +
//     '                "viz": false\n' +
//     '              },\n' +
//     '              "lineInterpolation": "linear",\n' +
//     '              "lineWidth": 1,\n' +
//     '              "pointSize": 5,\n' +
//     '              "scaleDistribution": {\n' +
//     '                "type": "linear"\n' +
//     '              },\n' +
//     '              "showPoints": "auto",\n' +
//     '              "spanNulls": false,\n' +
//     '              "stacking": {\n' +
//     '                "group": "A",\n' +
//     '                "mode": "none"\n' +
//     '              },\n' +
//     '              "thresholdsStyle": {\n' +
//     '                "mode": "off"\n' +
//     '              }\n' +
//     '            },\n' +
//     '            "mappings": [],\n' +
//     '            "thresholds": {\n' +
//     '              "mode": "absolute",\n' +
//     '              "steps": [\n' +
//     '                {\n' +
//     '                  "color": "green",\n' +
//     '                  "value": null\n' +
//     '                },\n' +
//     '                {\n' +
//     '                  "color": "red",\n' +
//     '                  "value": 80\n' +
//     '                }\n' +
//     '              ]\n' +
//     '            },\n' +
//     '            "unit": "decbytes"\n' +
//     '          },\n' +
//     '          "overrides": []\n' +
//     '        },\n' +
//     '        "gridPos": {\n' +
//     '          "h": 8,\n' +
//     '          "w": 12,\n' +
//     '          "x": 12,\n' +
//     '          "y": 25\n' +
//     '        },\n' +
//     '        "id": 14,\n' +
//     '        "options": {\n' +
//     '          "legend": {\n' +
//     '            "calcs": [],\n' +
//     '            "displayMode": "list",\n' +
//     '            "placement": "bottom",\n' +
//     '            "showLegend": true\n' +
//     '          },\n' +
//     '          "tooltip": {\n' +
//     '            "mode": "single",\n' +
//     '            "sort": "none"\n' +
//     '          }\n' +
//     '        },\n' +
//     '        "targets": [\n' +
//     '          {\n' +
//     '            "datasource": {\n' +
//     '              "type": "Prometheus",\n' +
//     '              "uid": "Prometheus"\n' +
//     '            },\n' +
//     '            "editorMode": "code",\n' +
//     '            "exemplar": true,\n' +
//     '            "expr": "rate(container_network_transmit_bytes_total{namespace=~\"${Namespace}\"}[5m])",\n' +
//     '            "interval": "",\n' +
//     '            "legendFormat": "{container:{{container}}, pod:{{pod}}, namespace:{{namespace}} }",\n' +
//     '            "range": true,\n' +
//     '            "refId": "A"\n' +
//     '          }\n' +
//     '        ],\n' +
//     '        "title": "Container Network Bytes Transmitted (Over Time)",\n' +
//     '        "type": "timeseries"\n' +
//     '      }\n' +
//     '    ],\n' +
//     '    "schemaVersion": 37,\n' +
//     '    "style": "dark",\n' +
//     '    "tags": [],\n' +
//     '    "templating": {\n' +
//     '      "list": [\n' +
//     '        {\n' +
//     '          "allValue": "example-namespace-name",\n' +
//     '          "current": {\n' +
//     '            "selected": false,\n' +
//     '            "text": [\n' +
//     '              "All"\n' +
//     '            ],\n' +
//     '            "value": [\n' +
//     '              "$__all"\n' +
//     '            ]\n' +
//     '          },\n' +
//     '          "description": "For selecting which namespaces to display metrics for",\n' +
//     '          "hide": 0,\n' +
//     '          "includeAll": true,\n' +
//     '          "label": "Environment",\n' +
//     '          "multi": true,\n' +
//     '          "name": "Namespace",\n' +
//     '          "options": [\n' +
//     '            {\n' +
//     '              "selected": true,\n' +
//     '              "text": "All",\n' +
//     '              "value": "$__all"\n' +
//     '            },\n' +
//     '            {\n' +
//     '              "selected": false,\n' +
//     '              "text": "example-namespace-name",\n' +
//     '              "value": "example-namespace-name"\n' +
//     '            }\n' +
//     '          ],\n' +
//     '          "query": "example-namespace-name",\n' +
//     '          "queryValue": "",\n' +
//     '          "skipUrlSync": false,\n' +
//     '          "type": "custom"\n' +
//     '        }\n' +
//     '      ]\n' +
//     '    },\n' +
//     '    "time": {\n' +
//     '      "from": "now-6h",\n' +
//     '      "to": "now"\n' +
//     '    },\n' +
//     '    "timepicker": {},\n' +
//     '    "timezone": "",\n' +
//     '    "title": "Hello World Performance Metrics",\n' +
//     '    "uid": "UTgkvtNVk15",\n' +
//     '    "version": 5,\n' +
//     '    "weekStart": ""\n' +
//     '  },\n' +
//     '  "folderUid": "replace",\n' +
//     '  "overwrite": true\n' +
//     '}\n'
//   },
//   immutable: undefined,
//   kind: 'ConfigMap',
//   metadata: {
//     name: 'metric-dashboard',
//     namespace: 'monitoring',
//   }
// }

// export async function createMetricDashboardConfigMap(){
//   const kc = new k8s.KubeConfig();
//   kc.loadFromDefault();
//   const k8sCoreApi = kc.makeApiClient(k8s.CoreV1Api);
//   console.log(k8sCoreApi.createNamespacedConfigMap("monitoring",configMapBody))
// }

import {
  Capability,
  a,
  fetch,
  k8s,
} from "pepr";

import { Buffer } from "buffer";
import { FetchResponse } from "pepr/dist/lib/fetch";


export const Grafana = new Capability({
  name: "grafana",
  description: `This module is meant to be used by 
    platform teams who stand up the same dashboards for every app teams 
    on their platforms. Utlizing this capability allows them to 
    create a folder, a team with permissions to that folder, a dashboard and alerts. 
    Could also be extended to create and configure notifications 
   `
});

const { When } = Grafana;
const decode = (str: string):string => Buffer.from(str, 'base64').toString('binary');
const encode = (str: string):string => Buffer.from(str, 'binary').toString('base64');


export async function getJsonFileFromConfigMap(configmapName: string) {
  const kc = new k8s.KubeConfig();
  kc.loadFromDefault();
  const k8sCoreApi = kc.makeApiClient(k8s.CoreV1Api);
  const response = await k8sCoreApi.readNamespacedConfigMap(configmapName,"monitoring")
  return JSON.parse(response.body.data["file.json"])
}

export async function getGrafanaAuthHeader() : Promise<string> {
  //Future enhancement could be creating api key on the fly if the API allows it
  const kc = new k8s.KubeConfig();
  kc.loadFromDefault();
  const k8sCoreApi = kc.makeApiClient(k8s.CoreV1Api);
  const response = await k8sCoreApi.readNamespacedSecret("monitoring-grafana","monitoring")
  const adminPassword = decode(response.body.data["admin-password"])
  const adminUsername = decode(response.body.data["admin-user"])
  const authHeader = "Basic " + encode(`${adminUsername}:${adminPassword}`)
  return authHeader
}

function generateRandomString(length: number): string {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return result;
}

interface GrafanaFolderData {
  id: number;
  uid: string;
  title: string;
}

export type GrafanaFolderDataArr = GrafanaFolderData[]

export async function grafanaApiCall<T>(method: string, path: string, body: string = null, additionalHeaders = {}): Promise<FetchResponse<T>> {
  try{
    const response = await fetch<T>(
      `https://grafana.bigbang.dev/${path}`,
      { 
        method: `${method}`, 
        headers: {
          'Authorization': `${await getGrafanaAuthHeader()}`,
          'Content-Type': 'application/json',
          ...additionalHeaders
        },
        body: body
      }
    );
    if (response.status == 403 || response.status == 401) {
      throw new Error(`Auth error! Status: ${JSON.stringify(response)}`);
    }
    return response;
  }
  catch (error) {
    console.error('Error fetching data:', error);
  }
}

export async function createFolder(namespaceName: string, createFolderApiCall: Function = grafanaApiCall<GrafanaFolderData>,
  getFoldersApiCall: Function = grafanaApiCall<GrafanaFolderDataArr>) : Promise<string> {
  const folderJson = {
    "uid": "example-uid",
    "title": "example-team"
  };
  const folderUid = generateRandomString(12)
  folderJson.title = `${namespaceName}`
  folderJson.uid = folderUid

  const folderJsonString = JSON.stringify(folderJson);
  const folderResponse = await createFolderApiCall("POST","api/folders",folderJsonString);
  console.log(`This is the folder response`)
  console.log(folderResponse)

  if (folderResponse.statusText == 'Conflict'){
    const getFolderResponse: FetchResponse<GrafanaFolderDataArr> = await getFoldersApiCall("GET","api/folders")
    const correctFolder = getFolderResponse.data.find(entry => entry.title === folderJson.title)
    return correctFolder.uid
  }
  return folderResponse.data.uid;
}

interface GrafanaDashboardReturn {
  id: string;
  slug: string;
  version: string;
  url: string;
  uid: string;
}

export async function createDashboard(namespaceName: string,folderUid: string,
  callCreateDashboardApi: Function = grafanaApiCall<GrafanaFolderDataArr>) : Promise<string> {
  // const metricJson = getJsonFile("metric.json")
  const metricJson = await getJsonFileFromConfigMap("metric-dashboard")
  const dashboardUid = generateRandomString(12)

  // Future enhancement get the number of namespaces with the same team or same dashboard enabled
  // Then add that to the dashboard
  // Future enhancement have the field to trigger this be pepr.io/grafana_app_name titles are based on that
  metricJson.dashboard.templating.list[0].allValue = namespaceName;
  metricJson.dashboard.templating.list[0].options[1].text = namespaceName;
  metricJson.dashboard.templating.list[0].options[1].value = namespaceName;
  metricJson.dashboard.templating.list[0].query = namespaceName;
  metricJson.folderUid = folderUid;
  metricJson.dashboard.uid = dashboardUid;

  const metricJsonString = JSON.stringify(metricJson);
  const metricResponse = await callCreateDashboardApi("POST","api/dashboards/db",metricJsonString)

  console.log("this is the metric response")
  console.log(metricResponse)

  return metricResponse.data.uid
}

export async function createAlert(dashboardUid: string,folderUid: string,dataSourceUid: string){
  const alertJson = await getJsonFileFromConfigMap("alert-dashboard")

  const alertUid = generateRandomString(12);
  alertJson.annotations.__dashboardUid__ = dashboardUid;
  alertJson.uid = alertUid;
  alertJson.folderUID = folderUid;
  alertJson.data[0].datasourceUid = dataSourceUid;

  const alertJsonString = JSON.stringify(alertJson);
  const alertResponse = await grafanaApiCall<GrafanaDashboardReturn>("POST","api/v1/provisioning/alert-rules/",alertJsonString,{'x-disable-provenance': 'true'})
  console.log(`the alert response ${JSON.stringify(alertResponse)}`)
}

interface GrafanaTeam {
  message: string;
  teamId: number;
}

export async function createTeam(teamName: string, apiCall: Function = grafanaApiCall<GrafanaTeam>) : Promise<number> {
  const team = {
    name: teamName,
    orgId: "1"
  };
  const teamJsonString = JSON.stringify(team);
  const createTeamResponse = await apiCall("POST","api/teams",teamJsonString)
  if (createTeamResponse.ok){
    return createTeamResponse.data.teamId
  }
  if (createTeamResponse.status == 409){
    const getTeams = await apiCall("GET",`api/teams/search?name=${teamName}`)
    return getTeams.data.teams[0].id
  }
  return -1;
}

export async function updatePermissions(folderUid: string, teamId: number,apiCall: Function = grafanaApiCall<GrafanaTeam>){
  const permissionsJson = {
    "items": [
      {
        "teamId": teamId,
        "permission": 2
      }
    ]  
  };
  const permissionJsonString = JSON.stringify(permissionsJson);
  await apiCall("POST",`api/folders/${folderUid}/permissions`,permissionJsonString)
}

export async function getDataSourceUid(dataSourceName: string, apiCall: Function = grafanaApiCall<GrafanaTeam>){
  const response = await apiCall("GET",`api/datasources`)
  const dataSourceEntry = response.data.find(item => item.name === dataSourceName)
  return dataSourceEntry.uid;
}

When(a.Namespace)
  .IsCreatedOrUpdated()
  .WithLabel("pepr.dev/create-grafana-dashboard")
  .Mutate(async change => {
    const namespaceName = change.Raw.metadata.name
    const teamName = change.Raw.metadata.labels["pepr.dev/grafana-team-name"]
    const folderUid = await createFolder(namespaceName);
    const teamId = await createTeam(teamName);
    const dashboardUid = await createDashboard(namespaceName,folderUid);
    const promUid = await getDataSourceUid("Prometheus")
    await createAlert(dashboardUid,folderUid,promUid)
    await updatePermissions(folderUid,teamId)
  });