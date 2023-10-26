import * as React from 'react';
//import styles from './ContactUs.module.scss';
import { IContactUsProps } from './IContactUsProps';
//import { escape } from '@microsoft/sp-lodash-subset';
import ContactusContainer from './ContactUsContainer';
import "../../../common/styles/bootstrap.css";
import "../../../common/fonts/fonts.scss";

export default class ContactUs extends React.Component<IContactUsProps, {}> {
  public render(): React.ReactElement<IContactUsProps> {
    return (
      <ContactusContainer _baseurl={this.props.baseurl} listid={this.props.listid} 
      spcontext={this.props.spcontext} contactdetails={this.props.contactDetails}/>
    );
  }
}
