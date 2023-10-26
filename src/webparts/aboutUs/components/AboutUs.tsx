import * as React from 'react';
//import styles from './AboutUs.module.scss';
import { IAboutUsProps } from './IAboutUsProps';
//import { escape } from '@microsoft/sp-lodash-subset';
import AboutusContainer from './AboutUsContainer';
import "../../../common/styles/bootstrap.css";
import "../../../common/fonts/fonts.scss";

export default class AboutUs extends React.Component<IAboutUsProps, {}> {
  public render(): React.ReactElement<IAboutUsProps> {

    return (
      <div>
        <AboutusContainer _baseurl={this.props.baseurl} listid={this.props.listid} spcontext={this.props.spcontext}/>
      </div>
    )
  }
}
