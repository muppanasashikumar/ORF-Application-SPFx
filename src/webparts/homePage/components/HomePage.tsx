import * as React from 'react';
// import commonStyles from './styles/Common.module.scss';
// import styles from './HomePage.module.scss';
import "../../../common/styles/bootstrap.css";
import { IHomePageProps } from './IHomePageProps';
// import FellowShipCard from './common/FellowShipCard';
import HomePageContainer from './HomePageContainer';
// import HomePageContainer from './HomePageContainer';
import "../../../common/fonts/fonts.scss";
// import { escape } from '@microsoft/sp-lodash-subset';

export default class HomePage extends React.Component<IHomePageProps, {}> {
  public render(): React.ReactElement<IHomePageProps> {

    return (
      
      <HomePageContainer spcontext={this.props.spcontext} 
      listid={this.props.listid}
      description={this.props.maindescription} 
      mainTitle={this.props.mainTitle} 
      _baseurl={this.props.baseurl} 
      myapplicationPageurl={this.props.detailpageurl}
      groupApplicants={this.props.groupApplicant}/>
      
    );
  }
}
