import * as React from "react";
import { Placeholder } from "@pnp/spfx-controls-react/lib/Placeholder";
const Configuration = (props) => {
  const _onConfigure = () => {
    // alert("On configure called");
    props.context.propertyPane.open();
  };
  return (
    <>
      <Placeholder
        iconName="Edit"
        iconText="Configure your web part"
        description="Please configure the web part."
        buttonLabel="Configure"
        //hideButton={props.displayMode === DisplayMode.Read}
        onConfigure={_onConfigure}
      />
    </>
  );
};

export default Configuration;
