/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as React from "react";
import "../../../common/styles/bootstrap.css";

//import { DataBinding } from "./Helper/DataBinding";
import { IOrfProps } from "./IOrfProps";
// import OrfParent from "./OrfParent";
import { FormwrapperControl } from "./FormWrapper";
import "../../../common/fonts/fonts.scss";

export default class Orf extends React.Component<IOrfProps, {}> {
  // private _helperClass: DataBinding;
  // private _allDataBinding:any;
  constructor(props: IOrfProps) {
    super(props);
    // console.log(props);
  }


  public render(): React.ReactElement<IOrfProps> {
    return (
      <div>
        {/* <OrfParent contentTypeField={this.props.contentTypeField}  allDataBinding={this.props.allBindingData}  /> */}
        <FormwrapperControl contentTypeField={this.props.contentTypeField}  allDataBinding={this.props.allBindingData} prarentProps={this.props}/>
      </div>
    );
  }
}
