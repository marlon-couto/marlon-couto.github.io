import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import { v4 as uuid } from "uuid";
import { useEffect, useState } from "react";
import { experiences, defaultTheme } from "../scripts/store";
import "react-vertical-timeline-component/style.min.css";

const ExperienceTimeline = () => {
  const [lineColor, setLineColor] = useState("");

  useEffect(() => {
    const getThemeColor = () => {
      const theme = document.documentElement.getAttribute("data-bs-theme");
      if (theme === "dark") {
        return "#dee2e6";
      } else {
        return "#212529";
      }
    };

    setLineColor(getThemeColor());
    const observer = new MutationObserver(() => setLineColor(getThemeColor()));
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-bs-theme"],
    });
    return () => observer.disconnect();
  }, []);

  return (
    <VerticalTimeline className="experience__timeline" lineColor={lineColor}>
      {experiences.get().map((experience) => (
        <VerticalTimelineElement
          key={uuid()}
          className="vertical-timeline-element--work"
          contentStyle={{
            backgroundColor: defaultTheme.get().backgroundColor,
            color: defaultTheme.get().color,
          }}
          contentArrowStyle={{
            borderRight: `7px solid ${defaultTheme.get().backgroundColor}`,
          }}
          date={experience.date}
          iconStyle={{
            backgroundColor: defaultTheme.get().backgroundColor,
            color: defaultTheme.get().color,
          }}
          icon={
            <div className="experience__icon">
              <a href={experience.link}>
                <img src={`assets/${experience.src}`} alt={experience.alt} />
              </a>
            </div>
          }
        >
          <h3 className="vertical-timeline-element-title">
            {experience.title}
          </h3>
          <h4 className="vertical-timeline-element-subtitle">
            {experience.subtitle}
          </h4>
          <p>{experience.description}</p>
        </VerticalTimelineElement>
      ))}
    </VerticalTimeline>
  );
};

export default ExperienceTimeline;
