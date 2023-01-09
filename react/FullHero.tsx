import React, { useEffect, useRef, useState } from "react";
// import { createPortal } from "react-dom";
import { canUseDOM } from "vtex.render-runtime";

import styles from "./styles.css";

interface FullHeroProps {

}


const FullHero: StorefrontFunctionComponent<FullHeroProps> = ({ }) => {
  const openGate = useRef(true);

  useEffect(() => {
    if (!openGate.current) return;
    openGate.current = false;

  })

  return <h1>Full Hero</h1>;
}

FullHero.schema = {
  title: "Full Hero",
  type: "object",
  properties: {}
}

export default FullHero;