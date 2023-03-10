import React, { useEffect, useRef, useState } from "react";
// import { createPortal } from "react-dom";
// import { canUseDOM } from "vtex.render-runtime";

import styles from "./styles.css";

interface FullHeroProps {
  titleTag: string
  titleText: string
  subtitleText: string
  ctaText: string
  ctaLink: string
  newTab: boolean
  altText: string
  desktopImage: string
  mobileImage: string
  desktopSize: string
  mobileSize: string
  maxHeight: string
  blockClass: string
}

interface imageSize {
  width: number
  height: number
}

const FullHero: StorefrontFunctionComponent<FullHeroProps> = ({ titleTag, titleText, subtitleText, ctaText, ctaLink, newTab, altText, desktopImage, mobileImage, desktopSize, mobileSize, maxHeight, blockClass }) => {
  const openGate = useRef(true);
  const [loading, setloading] = useState(true);
  const dSize = useRef<imageSize>();
  const mSize = useRef<imageSize>();

  const defaultTag = "div";
  const CustomTag: any = !titleTag ? `${defaultTag}` : `${titleTag}`;

  useEffect(() => {
    if (!openGate.current) return;
    openGate.current = false;

    dSize.current = {
      width: Number(desktopSize.split(" ")[0]),
      height: Number(desktopSize.split(" ")[1])
    }

    mSize.current = {
      width: Number(mobileSize.split(" ")[0]),
      height: Number(mobileSize.split(" ")[1])
    }

    setloading(false);
  })

  const ValidHero = () => (
    <div className={`${styles.container}--${blockClass}`}>
      <div className={`${styles.textContainer}--${blockClass}`}>
        {titleText && <CustomTag className={`${styles.titleText}--${blockClass}`}>{titleText}</CustomTag>}
        {subtitleText && <div className={`${styles.subtitleText}--${blockClass}`}>{subtitleText}</div>}
        {ctaText && <a href={ctaLink} target={newTab ? "_blank" : ""} className={`${styles.cta}--${blockClass}`}>{ctaText}</a>}
      </div>
      <img
        src={mobileImage}
        alt={altText}
        srcSet={`${desktopImage} ${dSize.current?.width}w, ${mobileImage} ${mSize.current?.width}w`}
        sizes={`(min-width:1026px) ${dSize.current?.width}px, ${mSize.current?.width}px`}
        width={dSize.current?.width}
        height={dSize.current?.height}
        style={{ maxHeight: maxHeight ? maxHeight : "" }} // CLS Strategy - LM
        className={`${styles.image}--${blockClass}`}
      />
    </div>
  )

  return loading ? <></> : <ValidHero />;
}

FullHero.schema = {
  title: "Full Hero",
  type: "object",
  properties: {
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
    newTab: {
      title: "Open Link in New Tab?",
      // description: "",
      type: "boolean"
    },
    altText: {
      title: "Alt Text",
      // description: "Relative or Absolute Path",
      type: "string"
    },
    maxHeight: {
      title: "Maximum Height of Image",
      description: "CSS Value for max-height. Example: 60vh",
      type: "string"
    },
    desktopImage: {
      title: "Desktop Image Source",
      description: "Absolute Path",
      type: "string"
    },
    mobileImage: {
      title: "Mobile Image Source",
      description: "Absolute Path",
      type: "string"
    },
    desktopSize: {
      title: "Desktop Image Size",
      description: "Width space Height. Desktop and Mobile must have identical aspect ratios. Example: 1680 510",
      type: "string"
    },
    mobileSize: {
      title: "Mobile Image Size",
      description: "Width space Height. Desktop and Mobile must have identical aspect ratios. Example: 450 137",
      type: "string"
    }
  }
}

export default FullHero;