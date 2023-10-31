import React, { useEffect, useRef, useState } from "react";
import { canUseDOM } from "vtex.render-runtime";

import styles from "./styles.css";

interface FullHeroProps {
  titleTag: string
  titleText: string
  subtitleText: string
  ctaText: string
  ctaLink: string
  newTab: boolean
  altText: string
  lazyLoading: boolean
  desktopImage: string
  mobileImage: string
  desktopSize: string
  mobileSize: string
  maxHeight: string
  blockClass: string
}

interface ImageSize {
  width: number
  height: number
}

const blankImageSize: ImageSize = {
  width: 0,
  height: 0
}

const FullHero: StorefrontFunctionComponent<FullHeroProps> = ({ lazyLoading, titleTag, titleText, subtitleText, ctaText, ctaLink, newTab, altText, desktopImage, mobileImage, desktopSize, mobileSize, maxHeight, blockClass }) => {
  const openGate = useRef(true);
  const [loading, setloading] = useState(true);
  const [device, setDevice] = useState<"desktop" | "mobile">("mobile");
  const [deviceWidth, setDeviceWidth] = useState(0);
  const [dSize, setDSize] = useState<ImageSize>(blankImageSize);
  const [mSize, setMSize] = useState<ImageSize>(blankImageSize);

  const defaultTag = "div";
  const CustomTag: any = !titleTag ? `${defaultTag}` : `${titleTag.toLowerCase()}`;

  useEffect(() => {
    if (!openGate.current || !canUseDOM) return;
    openGate.current = false;

    const windowWidth = window.innerWidth;
    setDeviceWidth(windowWidth);
    setDevice(windowWidth >= 1026 ? "desktop" : "mobile");

    // desktopSize and mobileSize are strings of pixel width and height formatted for example as: 450 116
    // This separates the values into separate numbers. - LM
    setDSize({
      width: Number(desktopSize.split(" ")[0]),
      height: Number(desktopSize.split(" ")[1])
    });

    setMSize({
      width: Number(mobileSize.split(" ")[0]),
      height: Number(mobileSize.split(" ")[1])
    });

    setloading(false);
  });

  const ValidHero = () => (
    <div className={`${styles.container}--${blockClass}`}>
      <div className={`${styles.textContainer}--${blockClass}`}>
        {titleText && <CustomTag className={`${styles.titleText}--${blockClass}`}>{titleText}</CustomTag>}
        {subtitleText && <div className={`${styles.subtitleText}--${blockClass}`}>{subtitleText}</div>}
        {ctaText && <a href={ctaLink} target={newTab ? "_blank" : ""} className={`${styles.cta}--${blockClass}`}>{ctaText}</a>}
      </div>
      <picture>
        {/* @ts-expect-error */}
        <source media="(min-width:1026px)" srcSet={desktopImage} width={dSize.width} height={dSize.height} />
        {/* @ts-expect-error */}
        <source media="(max-width:1025px)" srcSet={mobileImage} width={mSize.width} height={mSize.height} />
        <img
          src={mobileImage}
          alt={altText || titleText}
          loading={lazyLoading ? "lazy" : "eager"}
          width={device === "desktop" ? dSize.width : mSize.width}
          height={device === "desktop" ? dSize.height : mSize.height}
          style={{ maxHeight: maxHeight ? maxHeight : "" }} // CLS Strategy - LM
          className={`${styles.image}--${blockClass}`}
        />
      </picture>
    </div>
  )

  return loading ? <></> : (!ctaText && ctaLink) ?
    <a href={ctaLink} target={newTab ? "_blank" : ""}>
      <ValidHero />
    </a> :
    <ValidHero />;
}

FullHero.schema = {
  title: "Full Hero",
  type: "object",
  properties: {
    desktopImage: {
      title: "Desktop Image Source",
      type: "string",
      widget: { "ui:widget": "image-uploader" }
    },
    desktopSize: {
      title: "Desktop Image Size",
      description: "REQUIRED | Width space Height. Desktop and Mobile must have identical aspect ratios. Example: 1680 510",
      type: "string"
    },
    mobileImage: {
      title: "Mobile Image Source",
      type: "string",
      widget: { "ui:widget": "image-uploader" }
    },
    mobileSize: {
      title: "Mobile Image Size",
      description: "REQUIRED | Width space Height. Desktop and Mobile must have identical aspect ratios. Example: 450 137",
      type: "string"
    },
    titleTag: {
      title: "Title Tag",
      description: "h1, h2... Will default to div if blank.",
      type: "string"
    },
    titleText: {
      title: "Title Text",
      description: "Hidden if blank.",
      type: "string"
    },
    subtitleText: {
      title: "Sub Title Text",
      description: "Hidden if blank.",
      type: "string"
    },
    ctaText: {
      title: "Button / CTA Text",
      description: "Hidden if blank.",
      type: "string"
    },
    ctaLink: {
      title: "Button / CTA Link",
      description: "Relative or Absolute Path",
      type: "string"
    },
    lazyLoading: {
      title: "Lazy Loading?",
      description: "If turned on, this image will not load until the user scrolls it into view. Leave off for the first big image on screen.",
      type: "boolean"
    },
    newTab: {
      title: "Open Link in New Tab?",
      // description: "",
      type: "boolean"
    },
    altText: {
      title: "Alt Text",
      type: "string"
    },
    maxHeight: {
      title: "Maximum Height of Image",
      description: "CSS Value for max-height. Example: 60vh",
      type: "string"
    }
  }
}

export default FullHero;
