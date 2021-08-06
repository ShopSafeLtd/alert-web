import React, { useRef, useEffect, CSSProperties } from "react";
import { Card } from "antd";
import ApexChart, { Props as ChartProps } from "react-apexcharts";
import {
  apexLineChartDefaultOption,
  apexBarChartDefaultOption,
  apexAreaChartDefaultOption,
} from "constants/ChartConstant";
import ReactResizeDetector from "react-resize-detector";

const titleStyle:CSSProperties = {
  position: 'absolute',
  zIndex: 1,
};

const extraStyle:CSSProperties = {
  position: "absolute",
  zIndex: 1,
  right: 0,
  top: -2,
};

const getChartTypeDefaultOption = (type:string) => {
  switch (type) {
    case "line":
      return apexLineChartDefaultOption;
    case "bar":
      return apexBarChartDefaultOption;
    case "area":
      return apexAreaChartDefaultOption;
    default:
      return apexLineChartDefaultOption;
  }
};

interface Props extends ChartProps {
	title: string | JSX.Element;
  width: string | number;
  height: string | number;
  xAxis: any[];
  customOptions: any;
  card: boolean;
  extra: string;
}

const ChartWidget = ({
  title,
  series = [],
  width = '100%',
  height = 300,
  xAxis,
  customOptions,
  card = true,
  type = 'line',
  extra,
}: Props) => {
	let options = getChartTypeDefaultOption(type);
	
	const isMobile = window.innerWidth < 768;
	
  const setLegendOffset = () => {
    if (chartRef.current) {
      const legend = chartRef.current.querySelectorAll(
        "div.apexcharts-legend"
			)[0];
			// @ts-expect-error
      legend.style.marginRight = `${
        isMobile ? 0 : extraRef.current?.offsetWidth
      }px`;
      if (isMobile) {
			// @ts-expect-error
        legend.style.position = "relative";
			// @ts-expect-error
        legend.style.top = 0;
			// @ts-expect-error
        legend.style.justifyContent = "start";
			// @ts-expect-error
        legend.style.padding = 0;
      }
    }
  };

  useEffect(() => {
    setLegendOffset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const extraRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<HTMLDivElement>(null);

	// @ts-expect-error
  options.xaxis.categories = xAxis;
  if (customOptions) {
    options = { ...options, ...customOptions };
  }

  const onResize = () => {
    setTimeout(() => {
      setLegendOffset();
    }, 600);
  };

  const renderChart = (
	// @ts-expect-error
    <ReactResizeDetector onResize={onResize()}>
      <div className="chartRef" ref={chartRef}>
        <ApexChart
          options={options}
          type={type}
          series={series}
          width={width}
          height={height}
        />
      </div>
    </ReactResizeDetector>
  );

  return (
    <>
      {card ? (
        <Card>
          <div className="position-relative">
            {<div style={!isMobile ? titleStyle : undefined}>{title}</div> && (
              <h4
                className="font-weight-bold"
                style={!isMobile ? titleStyle : undefined}
              >
                {title}
              </h4>
            )}
            {extra && (
              <div ref={extraRef} style={!isMobile ? extraStyle : {}}>
                {extra}
              </div>
            )}
            {renderChart}
          </div>
        </Card>
      ) : (
        renderChart
      )}
    </>
  );
};





export default ChartWidget;
