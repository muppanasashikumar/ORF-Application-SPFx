/* eslint-disable no-unused-expressions */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable prefer-const */
/* eslint-disable dot-notation */
/* eslint-disable require-atomic-updates */
/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as React from "react";
import DetailsOfNominator from "./PersonalDetails/DetailsOfNominator";
import PrivateAddress from "./PersonalDetails/PrivateAddress";
import PersonalData from "./PersonalDetails/PersonalData";
import UploadDocuments from "./UploadDocuments/UploadDocuments";
import BranchOfStudy from "./QualificationDetails/BranchOfStudy";
import BusinessAddress from "./PersonalDetails/BusinessAddress";
import OtherQualifications from "./QualificationDetails/OtherQualifications";
import { MultiStepForm } from "./Helper/MultiStepForm";
import buttonStyles from "./styles/Button.module.scss";
import formStyles from "./styles/Common.module.scss";
import { IYoungFellowState } from "./IYoungFellowState";
import { useForm } from "react-hook-form";
import Navigation from "./Navigation";
import spOperation from "./spService/spService";
import Header from "./common/Header";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
// import { ClipLoader } from "react-spinners";

type FormWrapperControlData = {
  allDataBinding: {
    salutation: any[];
    country: any[];
    continent: any[];
    fieldOfActivity: any[];
    branchofstudy: any[];
    fieldOfExpertise: any[];
    countryCode: any[];
  };
  contentTypeField: any[];
  prarentProps: any;
};

type FormData = {
  RUC_CV: string;
  RUC_Salutation: any;
  RUC_Title: string;
  RUC_LastName: string;
  RUC_FirstName: string;
  RUC_DateofBirth: string;
  RUC_Nationality: any;
  RUC_OtherNationality: any;
  RUC_CurrentCountryofResidence: any;
  RUC_FullnameOfYourNominator: string;
  RUC_CompanyInstitute: string;
  RUC_LetterOfNomination: string;
  RUC_PAStreet: string;
  RUC_2ndLineOfAddress: string;
  RUC_PAZipcode: string;
  RUC_PACity: string;
  RUC_PACountry: any;
  RUC_PAContinent: any;
  RUC_PAPhone: string;
  RUC_PACellPhone: string;
  RUC_PAEmail: string;
  RUC_FieldofActivity: any;
  RUC_Employer: string;
  RUC_Department: string;
  RUC_Position: string;
  RUC_BAStreet: string;
  RUC_BAZipcode: string;
  RUC_BACity: string;
  RUC_BACountry: any;
  RUC_BAContinent: any;
  RUC_BAPhone: string;
  RUC_BACellPhone: string;
  RUC_BAEmail: string;
  RUC_Branch1: any;
  RUC_Branch1Other: string;
  RUC_Branch1University: string;
  RUC_Branch1City: string;
  RUC_Branch1Country: any;
  RUC_Branch1Continent: any;
  RUC_Branch1From: string;
  RUC_Branch1To: string;
  RUC_Branch1Degree: string;
  RUC_Branch1DegreeOther: string;
  RUC_Branch1TitleofBA_MA: string;
  RUC_Branch2: any;
  RUC_Branch2Other: string;
  RUC_Branch2University: string;
  RUC_Branch2City: string;
  RUC_Branch2Country: any;
  RUC_Branch2Continent: any;
  RUC_Branch2From: string;
  RUC_Branch2To: string;
  RUC_Branch2Degree: string;
  RUC_Branch2DegreeOther: string;
  RUC_Branch2TitleofBA_MA: string;
  RUC_Branch3: any;
  RUC_Branch3Other: string;
  RUC_Branch3University: string;
  RUC_Branch3City: string;
  RUC_Branch3Country: any;
  RUC_Branch3Continent: any;
  RUC_Branch3From: string;
  RUC_Branch3To: string;
  RUC_Branch3Degree: string;
  RUC_Branch3DegreeOther: string;
  RUC_Branch3TitleofBA_MA: string;
  RUC_Branch4: any;
  RUC_Branch4Other: string;
  RUC_Branch4University: string;
  RUC_Branch4City: string;
  RUC_Branch4Country: any;
  RUC_Branch4Continent: any;
  RUC_Branch4From: string;
  RUC_Branch4To: string;
  RUC_Branch4Degree: string;
  RUC_Branch4DegreeOther: string;
  RUC_Branch4TitleofBA_MA: string;
  RUC_FieldofExpertise: any;
  RUC_OtherQualifications: string;
  RUC_FurtherQualifications: string;
  RUC_YourPhotograph: string;
  RUC_PersonalIntroduction: string;
  RUC_LetterofIntent: string;
  RUC_ApplicationStatus: string;
  FILE_Content_LetterofNomination: any;
  FILE_Content_YourPhotograph: any;
  FILE_Content_CV: any;
  FILE_Content_LetterofIntent: any;
  FILE_Content_PersonalIntroduction: any;

  RUC_Organisation_Ministry: string;
  RUC_NominatorCountry: any;
  RUC_AppliedDate: string;
  RUC_Branch2Checkbox: boolean;
  RUC_Branch3Checkbox: boolean;
  RUC_Branch4Checkbox: boolean;
  RUC_RUC_BAPACheckbox: boolean;
};

const youngFellowListItem: IYoungFellowState = {
  RUC_AppliedDate: "",
  RUC_ApplicationStatus: "Draft",
  RUC_Salutation: [],
  RUC_Title: "",
  RUC_LastName: "",
  RUC_FirstName: "",
  RUC_DateofBirth: "",
  RUC_Nationality: [],
  RUC_OtherNationality: [],
  RUC_CurrentCountryofResidence: [],
  RUC_FullnameOfYourNominator: "",
  RUC_CompanyInstitute: "",
  RUC_LetterOfNomination: "",
  RUC_PAStreet: "",
  RUC_2ndLineOfAddress: "",
  RUC_PAZipcode: "",
  RUC_PACity: "",
  RUC_PACountry: [],
  RUC_PAContinent: [],
  RUC_PAPhone: "",
  RUC_PACellPhone: "",
  RUC_PAEmail: "",
  RUC_FieldofActivity: [],
  RUC_Employer: "",
  RUC_Department: "",
  RUC_Position: "",
  RUC_BAStreet: "",
  RUC_BAZipcode: "",
  RUC_BACity: "",
  RUC_BACountry: [],
  RUC_BAContinent: [],
  RUC_BAPhone: "",
  RUC_BACellPhone: "",
  RUC_BAEmail: "",
  RUC_Branch1: [],
  RUC_Branch1Other: "",
  RUC_Branch1University: "",
  RUC_Branch1City: "",
  RUC_Branch1Country: [],
  RUC_Branch1Continent: [],
  RUC_Branch1From: "",
  RUC_Branch1To: "",
  RUC_Branch1Degree: "",
  RUC_Branch1DegreeOther: "",
  RUC_Branch1TitleofBA_MA: "",
  RUC_Branch2: [],
  RUC_Branch2Other: "",
  RUC_Branch2University: "",
  RUC_Branch2City: "",
  RUC_Branch2Country: [],
  RUC_Branch2Continent: [],
  RUC_Branch2From: "",
  RUC_Branch2To: "",
  RUC_Branch2Degree: "",
  RUC_Branch2DegreeOther: "",
  RUC_Branch2TitleofBA_MA: "",
  RUC_Branch3: [],
  RUC_Branch3Other: "",
  RUC_Branch3University: "",
  RUC_Branch3City: "",
  RUC_Branch3Country: [],
  RUC_Branch3Continent: [],
  RUC_Branch3From: "",
  RUC_Branch3To: "",
  RUC_Branch3Degree: "",
  RUC_Branch3DegreeOther: "",
  RUC_Branch3TitleofBA_MA: "",
  RUC_Branch4: [],
  RUC_Branch4Other: "",
  RUC_Branch4University: "",
  RUC_Branch4City: "",
  RUC_Branch4Country: [],
  RUC_Branch4Continent: [],
  RUC_Branch4From: "",
  RUC_Branch4To: "",
  RUC_Branch4Degree: "",
  RUC_Branch4DegreeOther: "",
  RUC_Branch4TitleofBA_MA: "",
  RUC_FieldofExpertise: [],
  RUC_OtherQualifications: "",
  RUC_FurtherQualifications: "",
  RUC_YourPhotograph: "",
  RUC_CV: "",
  RUC_PersonalIntroduction: "",
  RUC_LetterofIntent: "",
  FILE_Content_LetterofNomination: [],
  FILE_Content_YourPhotograph: [],
  FILE_Content_CV: [],
  FILE_Content_LetterofIntent: [],
  FILE_Content_PersonalIntroduction: [],

  RUC_Organisation_Ministry: "",
  RUC_NominatorCountry: [],
  RUC_BAPACheckbox: false,
  RUC_Branch2Checkbox: false,
  RUC_Branch3Checkbox: false,
  RUC_Branch4Checkbox: false,
};

export const FormwrapperControl = ({
  allDataBinding,
  contentTypeField,
  prarentProps,
}: FormWrapperControlData) => {
  //const values=prarentProps.itemIdYoungFellow.item;
  //console.log("formName",prarentProps.formselected)

  const _itemdata =
    prarentProps.itemIdYoungFellow?.item !== -1
      ? prarentProps.itemIdYoungFellow.item
      : 0;
  const _versiondata =
    prarentProps.versionNo !== undefined ? prarentProps.versionItem.item : 0;
  //const _fileData = prarentProps.itemIdYoungFellow.filesArr;
  // let branch2: boolean = false;

  // let branch3: boolean = false;

  // let branch4: boolean = false;

  let formModeDisable = false;
  //form binding
  if (prarentProps.versionNo === undefined && _itemdata) {
    // branch2 =
    //   _itemdata.RUC_Branch2Id !== null && _itemdata.RUC_Branch2Id > 0
    //     ? true
    //     : false;
    // branch3 =
    //   _itemdata.RUC_Branch3Id !== null && _itemdata.RUC_Branch3Id > 0
    //     ? true
    //     : false;
    // branch4 =
    //   _itemdata.RUC_Branch4Id !== null && _itemdata.RUC_Branch4Id > 0
    //     ? true
    //     : false;
    const resfileArray = prarentProps.itemIdYoungFellow.filesArr;

    const _fieldofExp: any = [];

    !(_itemdata.RUC_FieldofExpertiseId === null) &&
      _itemdata.RUC_FieldofExpertiseId.map((each: any) => {
        allDataBinding.fieldOfExpertise.filter((_e: any) => {
          if (Number(_e.value) === Number(each)) {
            _fieldofExp.push(_e);
          }
        });
      });

    youngFellowListItem.RUC_Salutation = allDataBinding.salutation.filter(
      (_e) => _e.value === _itemdata.RUC_Salutation
    );
    youngFellowListItem.RUC_Title = _itemdata.RUC_Title;
    youngFellowListItem.RUC_LastName = _itemdata.RUC_LastName;
    youngFellowListItem.RUC_FirstName = _itemdata.RUC_FirstName;
    youngFellowListItem.RUC_DateofBirth =
      _itemdata.RUC_DateofBirth === "1970-01-01T00:00:00Z" ||
      _itemdata.RUC_DateofBirth === null
        ? ""
        : _itemdata.RUC_DateofBirth;
    // youngFellowListItem.RUC_Nationality = allDataBinding.country.filter(
    //   (_e) => _e.value === _itemdata.RUC_NationalityId
    // );
    youngFellowListItem.RUC_Nationality = allDataBinding.countryCode.filter(
      (_e) => _e.value === _itemdata.RUC_NationalityId
    );
    youngFellowListItem.RUC_OtherNationality =
      allDataBinding.countryCode.filter(
        (_e) => _e.value === _itemdata.RUC_OtherNationalityId
      );
    youngFellowListItem.RUC_CurrentCountryofResidence =
      allDataBinding.countryCode.filter(
        (_e) => _e.value === _itemdata.RUC_CurrentCountryofResidenceId
      );

    youngFellowListItem.RUC_FullnameOfYourNominator =
      _itemdata.RUC_FullnameOfYourNominator;

    youngFellowListItem.RUC_LetterOfNomination =
      _itemdata.RUC_LetterOfNomination;
    if (prarentProps.formselected === "RFFD") {
      youngFellowListItem.RUC_Organisation_Ministry =
        _itemdata.RUC_Organisation_Ministry;
      youngFellowListItem.RUC_NominatorCountry =
        allDataBinding.countryCode.filter(
          (_e) => _e.value === _itemdata.RUC_NominatorCountryId
        );
    }
    if (prarentProps.formselected === "RYFP") {
      youngFellowListItem.RUC_CompanyInstitute = _itemdata.RUC_CompanyInstitute;
    }

    youngFellowListItem.RUC_PAStreet = _itemdata.RUC_PAStreet;
    youngFellowListItem.RUC_2ndLineOfAddress = _itemdata.RUC_2ndLineOfAddress;
    youngFellowListItem.RUC_PAZipcode = _itemdata.RUC_PAZipcode;
    youngFellowListItem.RUC_PACity = _itemdata.RUC_PACity;
    youngFellowListItem.RUC_PACountry = allDataBinding.countryCode.filter(
      (_e) => _e.value === _itemdata.RUC_PACountryId
    );
    youngFellowListItem.RUC_PAContinent = allDataBinding.continent.filter(
      (_e) => _e.value === _itemdata.RUC_PAContinentId
    );
    youngFellowListItem.RUC_PAPhone = _itemdata.RUC_PAPhone;
    youngFellowListItem.RUC_PACellPhone = _itemdata.RUC_PACellPhone;
    youngFellowListItem.RUC_PAEmail = _itemdata.RUC_PAEmail;
    youngFellowListItem.RUC_FieldofActivity =
      allDataBinding.fieldOfActivity.filter(
        (_e) => _e.value === _itemdata.RUC_FieldofActivityId
      );
    youngFellowListItem.RUC_Department = _itemdata.RUC_Department;
    youngFellowListItem.RUC_Employer = _itemdata.RUC_Employer;
    youngFellowListItem.RUC_Position = _itemdata.RUC_Position;
    youngFellowListItem.RUC_BAStreet = _itemdata.RUC_BAStreet;

    youngFellowListItem.RUC_BAZipcode = _itemdata.RUC_BAZipcode;
    youngFellowListItem.RUC_BACity = _itemdata.RUC_BACity;
    youngFellowListItem.RUC_BACountry = allDataBinding.countryCode.filter(
      (_e) => _e.value === _itemdata.RUC_BACountryId
    );
    youngFellowListItem.RUC_BAContinent = allDataBinding.continent.filter(
      (_e) => _e.value === _itemdata.RUC_BAContinentId
    );
    youngFellowListItem.RUC_BAPhone = _itemdata.RUC_BAPhone;
    youngFellowListItem.RUC_BACellPhone = _itemdata.RUC_BACellPhone;
    youngFellowListItem.RUC_BAEmail = _itemdata.RUC_BAEmail;
    youngFellowListItem.RUC_Branch1 = allDataBinding.branchofstudy.filter(
      (_e) => _e.value === _itemdata.RUC_Branch1Id
    );
    youngFellowListItem.RUC_Branch1Other = _itemdata.RUC_Branch1Other;
    youngFellowListItem.RUC_Branch1University = _itemdata.RUC_Branch1University;
    youngFellowListItem.RUC_Branch1City = _itemdata.RUC_Branch1City;
    youngFellowListItem.RUC_Branch1Country = allDataBinding.countryCode.filter(
      (_e) => _e.value === _itemdata.RUC_Branch1CountryId
    );
    youngFellowListItem.RUC_Branch1Continent = allDataBinding.continent.filter(
      (_e) => _e.value === _itemdata.RUC_Branch1ContinentId
    );
    youngFellowListItem.RUC_Branch1From =
      _itemdata.RUC_Branch1From === "1970-01-01T00:00:00Z" ||
      _itemdata.RUC_Branch1From === null
        ? ""
        : _itemdata.RUC_Branch1From;
    youngFellowListItem.RUC_Branch1To =
      _itemdata.RUC_Branch1To === "1970-01-01T00:00:00Z" ||
      _itemdata.RUC_Branch1To === null
        ? ""
        : _itemdata.RUC_Branch1To;
    youngFellowListItem.RUC_Branch1Degree = _itemdata.RUC_Branch1Degree;
    youngFellowListItem.RUC_Branch1DegreeOther =
      _itemdata.RUC_Branch1DegreeOther;
    youngFellowListItem.RUC_Branch1TitleofBA_MA =
      _itemdata.RUC_Branch1TitleofBA_MA;
    youngFellowListItem.RUC_Branch2 = allDataBinding.branchofstudy.filter(
      (_e) => _e.value === _itemdata.RUC_Branch2Id
    );
    youngFellowListItem.RUC_Branch2Other = _itemdata.RUC_Branch2Other;
    youngFellowListItem.RUC_Branch2University = _itemdata.RUC_Branch2University;
    youngFellowListItem.RUC_Branch2City = _itemdata.RUC_Branch2City;
    youngFellowListItem.RUC_Branch2Country = allDataBinding.countryCode.filter(
      (_e) => _e.value === _itemdata.RUC_Branch2CountryId
    );
    youngFellowListItem.RUC_Branch2Continent = allDataBinding.continent.filter(
      (_e) => _e.value === _itemdata.RUC_Branch2ContinentId
    );
    youngFellowListItem.RUC_Branch2From =
      _itemdata.RUC_Branch2From === "1970-01-01T00:00:00Z" ||
      _itemdata.RUC_Branch2From === null
        ? ""
        : _itemdata.RUC_Branch2From;
    youngFellowListItem.RUC_Branch2To =
      _itemdata.RUC_Branch2To === "1970-01-01T00:00:00Z" ||
      _itemdata.RUC_Branch2To === null
        ? ""
        : _itemdata.RUC_Branch2To;
    youngFellowListItem.RUC_Branch2Degree = _itemdata.RUC_Branch2Degree;
    youngFellowListItem.RUC_Branch2DegreeOther =
      _itemdata.RUC_Branch2DegreeOther;
    youngFellowListItem.RUC_Branch2TitleofBA_MA =
      _itemdata.RUC_Branch2TitleofBA_MA;
    youngFellowListItem.RUC_Branch3 = allDataBinding.branchofstudy.filter(
      (_e) => _e.value === _itemdata.RUC_Branch3Id
    );
    youngFellowListItem.RUC_Branch3Other = _itemdata.RUC_Branch3Other;
    youngFellowListItem.RUC_Branch3University = _itemdata.RUC_Branch3University;
    youngFellowListItem.RUC_Branch3City = _itemdata.RUC_Branch3City;
    youngFellowListItem.RUC_Branch3Country = allDataBinding.countryCode.filter(
      (_e) => _e.value === _itemdata.RUC_Branch3CountryId
    );
    youngFellowListItem.RUC_Branch3Continent = allDataBinding.continent.filter(
      (_e) => _e.value === _itemdata.RUC_Branch3ContinentId
    );
    youngFellowListItem.RUC_Branch3From =
      _itemdata.RUC_Branch3From === "1970-01-01T00:00:00Z" ||
      _itemdata.RUC_Branch3From === null
        ? ""
        : _itemdata.RUC_Branch3From;
    youngFellowListItem.RUC_Branch3To =
      _itemdata.RUC_Branch3To === "1970-01-01T00:00:00Z" ||
      _itemdata.RUC_Branch3To === null
        ? ""
        : _itemdata.RUC_Branch3To;
    youngFellowListItem.RUC_Branch3Degree = _itemdata.RUC_Branch3Degree;
    youngFellowListItem.RUC_Branch3DegreeOther =
      _itemdata.RUC_Branch3DegreeOther;
    youngFellowListItem.RUC_Branch3TitleofBA_MA =
      _itemdata.RUC_Branch3TitleofBA_MA;
    youngFellowListItem.RUC_Branch4 = allDataBinding.branchofstudy.filter(
      (_e) => _e.value === _itemdata.RUC_Branch4Id
    );
    youngFellowListItem.RUC_Branch4Other = _itemdata.RUC_Branch4Other;
    youngFellowListItem.RUC_Branch4University = _itemdata.RUC_Branch4University;
    youngFellowListItem.RUC_Branch4City = _itemdata.RUC_Branch4City;
    youngFellowListItem.RUC_Branch4Country = allDataBinding.countryCode.filter(
      (_e) => _e.value === _itemdata.RUC_Branch4CountryId
    );
    youngFellowListItem.RUC_Branch4Continent = allDataBinding.continent.filter(
      (_e) => _e.value === _itemdata.RUC_Branch4ContinentId
    );
    youngFellowListItem.RUC_Branch4From =
      _itemdata.RUC_Branch4From === "1970-01-01T00:00:00Z" ||
      _itemdata.RUC_Branch4From === null
        ? ""
        : _itemdata.RUC_Branch4From;
    youngFellowListItem.RUC_Branch4To =
      _itemdata.RUC_Branch4To === "1970-01-01T00:00:00Z" ||
      _itemdata.RUC_Branch4To === null
        ? ""
        : _itemdata.RUC_Branch4To;
    youngFellowListItem.RUC_Branch4Degree = _itemdata.RUC_Branch4Degree;
    youngFellowListItem.RUC_Branch4DegreeOther =
      _itemdata.RUC_Branch4DegreeOther;
    youngFellowListItem.RUC_Branch4TitleofBA_MA =
      _itemdata.RUC_Branch4TitleofBA_MA;
    youngFellowListItem.RUC_OtherQualifications =
      _itemdata.RUC_OtherQualifications;
    youngFellowListItem.RUC_FurtherQualifications =
      _itemdata.RUC_FurtherQualifications;
    youngFellowListItem.RUC_FieldofExpertise = _fieldofExp;
    youngFellowListItem.RUC_LetterofIntent = _itemdata.RUC_LetterofIntent;

    youngFellowListItem.RUC_CV = _itemdata.RUC_CV;

    youngFellowListItem.RUC_YourPhotograph = _itemdata.RUC_YourPhotograph;

    youngFellowListItem.RUC_PersonalIntroduction =
      _itemdata.RUC_PersonalIntroduction;
    youngFellowListItem.RUC_ApplicationStatus = _itemdata.RUC_ApplicationStatus;
    youngFellowListItem.RUC_AppliedDate = _itemdata.RUC_AppliedDate;
    youngFellowListItem.RUC_BAPACheckbox =
      _itemdata.RUC_BAPACheckbox === null ? false : _itemdata.RUC_BAPACheckbox;
    youngFellowListItem.RUC_Branch2Checkbox =
      _itemdata.RUC_Branch2Checkbox === null
        ? false
        : _itemdata.RUC_Branch2Checkbox;
    youngFellowListItem.RUC_Branch3Checkbox =
      _itemdata.RUC_Branch3Checkbox === null
        ? false
        : _itemdata.RUC_Branch3Checkbox;
    youngFellowListItem.RUC_Branch4Checkbox =
      _itemdata.RUC_Branch4Checkbox === null
        ? false
        : _itemdata.RUC_Branch4Checkbox;
    if (resfileArray.length > 0) {
      for (let i = 0; i < resfileArray.length; i++) {
        if (
          resfileArray[i].fileName ===
          youngFellowListItem.RUC_LetterOfNomination
        ) {
          youngFellowListItem.FILE_Content_LetterofNomination = [
            {
              source: resfileArray[i].filepath,
              options: {
                type: "local",
              },
            },
          ];
        }
        if (
          resfileArray[i].fileName === youngFellowListItem.RUC_LetterofIntent
        ) {
          youngFellowListItem.FILE_Content_LetterofIntent = [
            {
              source: resfileArray[i].filepath,
              options: {
                type: "local",
              },
            },
          ];
        }
        if (resfileArray[i].fileName === youngFellowListItem.RUC_CV) {
          youngFellowListItem.FILE_Content_CV = [
            {
              source: resfileArray[i].filepath,
              options: {
                type: "local",
              },
            },
          ];
        }
        if (
          resfileArray[i].fileName === youngFellowListItem.RUC_YourPhotograph
        ) {
          youngFellowListItem.FILE_Content_YourPhotograph = [
            {
              source: resfileArray[i].filepath,
              options: {
                type: "local",
              },
            },
          ];
        }
        if (
          resfileArray[i].fileName ===
          youngFellowListItem.RUC_PersonalIntroduction
        ) {
          youngFellowListItem.FILE_Content_PersonalIntroduction = [
            {
              source: resfileArray[i].filepath,
              options: {
                type: "local",
              },
            },
          ];
        }
      }
    }
  }
  //version binding
  if (!(prarentProps.versionNo === undefined) && _versiondata) {
    // branch2 =
    //   _versiondata.RUC_x005f_Branch2 !== null &&
    //   _versiondata.RUC_x005f_Branch2.LookupId > 0
    //     ? true
    //     : false;
    // branch3 =
    //   _versiondata.RUC_x005f_Branch3 !== null &&
    //   _versiondata.RUC_x005f_Branch3.LookupId > 0
    //     ? true
    //     : false;
    // branch4 =
    //   _versiondata.RUC_x005f_Branch4 !== null &&
    //   _versiondata.RUC_x005f_Branch4.LookupId > 0
    //     ? true
    //     : false;
    const resfileArray = prarentProps.versionItem.filesArr;

    const _fieldofExp: any = [];

    _versiondata.RUC_x005f_FieldofExpertise.length > 0 &&
      _versiondata.RUC_x005f_FieldofExpertise.map((each: any) => {
        allDataBinding.fieldOfExpertise.filter((_e: any) => {
          if (Number(_e.value) === Number(each.LookupId)) {
            _fieldofExp.push(_e);
          }
        });
      });

    youngFellowListItem.RUC_Salutation = allDataBinding.salutation.filter(
      (_e) => _e.value === _versiondata.RUC_x005f_Salutation
    );
    youngFellowListItem.RUC_Title = _versiondata.RUC_x005f_Title;
    youngFellowListItem.RUC_LastName = _versiondata.RUC_x005f_LastName;
    youngFellowListItem.RUC_FirstName = _versiondata.RUC_x005f_FirstName;
    youngFellowListItem.RUC_DateofBirth =
      _versiondata.RUC_x005f_DateofBirth === "1970-01-01T00:00:00Z"
        ? ""
        : _versiondata.RUC_x005f_DateofBirth;
    // youngFellowListItem.RUC_Nationality = allDataBinding.country.filter(
    //   (_e) => _e.value === _itemdata.RUC_NationalityId
    // );
    _versiondata.RUC_x005f_Nationality !== null &&
      (youngFellowListItem.RUC_Nationality = allDataBinding.countryCode.filter(
        (_e) => _e.value === _versiondata.RUC_x005f_Nationality.LookupId
      ));
    _versiondata.RUC_x005f_OtherNationality !== null &&
      (youngFellowListItem.RUC_OtherNationality =
        allDataBinding.countryCode.filter(
          (_e) => _e.value === _versiondata.RUC_x005f_OtherNationality.LookupId
        ));
    _versiondata.RUC_x005f_CurrentCountryofResidence !== null &&
      (youngFellowListItem.RUC_CurrentCountryofResidence =
        allDataBinding.countryCode.filter(
          (_e) =>
            _e.value ===
            _versiondata.RUC_x005f_CurrentCountryofResidence.LookupId
        ));

    youngFellowListItem.RUC_FullnameOfYourNominator =
      _versiondata.RUC_x005f_FullnameOfYourNominator;

    youngFellowListItem.RUC_LetterOfNomination =
      _versiondata.RUC_x005f_LetterOfNomination;
    if (prarentProps.formselected === "RFFD") {
      youngFellowListItem.RUC_Organisation_Ministry =
        _versiondata.RUC_x005f_Organisation_x005f_Ministry;
      _versiondata.RUC_x005f_NominatorCountry !== null &&
        (youngFellowListItem.RUC_NominatorCountry =
          allDataBinding.countryCode.filter(
            (_e) =>
              _e.value === _versiondata.RUC_x005f_NominatorCountry.LookupId
          ));
    }
    if (prarentProps.formselected === "RYFP") {
      youngFellowListItem.RUC_CompanyInstitute =
        _versiondata.RUC_x005f_CompanyInstitute;
    }

    youngFellowListItem.RUC_PAStreet = _versiondata.RUC_x005f_PAStreet;
    youngFellowListItem.RUC_2ndLineOfAddress =
      _versiondata.RUC_x005f_2ndLineOfAddress;
    youngFellowListItem.RUC_PAZipcode = _versiondata.RUC_x005f_PAZipcode;
    youngFellowListItem.RUC_PACity = _versiondata.RUC_x005f_PACity;
    _versiondata.RUC_x005f_PACountry !== null &&
      (youngFellowListItem.RUC_PACountry = allDataBinding.countryCode.filter(
        (_e) => _e.value === _versiondata.RUC_x005f_PACountry.LookupId
      ));
    _versiondata.RUC_x005f_PAContinent !== null &&
      (youngFellowListItem.RUC_PAContinent = allDataBinding.continent.filter(
        (_e) => _e.value === _versiondata.RUC_x005f_PAContinent.LookupId
      ));
    youngFellowListItem.RUC_PAPhone = _versiondata.RUC_x005f_PAPhone;
    youngFellowListItem.RUC_PACellPhone = _versiondata.RUC_x005f_PACellPhone;
    youngFellowListItem.RUC_PAEmail = _versiondata.RUC_x005f_PAEmail;
    _versiondata.RUC_x005f_FieldofActivity !== null &&
      (youngFellowListItem.RUC_FieldofActivity =
        allDataBinding.fieldOfActivity.filter(
          (_e) => _e.value === _versiondata.RUC_x005f_FieldofActivity.LookupId
        ));
    youngFellowListItem.RUC_Department = _versiondata.RUC_x005f_Department;
    youngFellowListItem.RUC_Employer = _versiondata.RUC_x005f_Employer;
    youngFellowListItem.RUC_Position = _versiondata.RUC_x005f_Position;
    youngFellowListItem.RUC_BAStreet = _versiondata.RUC_x005f_BAStreet;

    youngFellowListItem.RUC_BAZipcode = _versiondata.RUC_x005f_BAZipcode;
    youngFellowListItem.RUC_BACity = _versiondata.RUC_x005f_BACity;
    _versiondata.RUC_x005f_BACountry !== null &&
      (youngFellowListItem.RUC_BACountry = allDataBinding.countryCode.filter(
        (_e) => _e.value === _versiondata.RUC_x005f_BACountry.LookupId
      ));
    _versiondata.RUC_x005f_BAContinent !== null &&
      (youngFellowListItem.RUC_BAContinent = allDataBinding.continent.filter(
        (_e) => _e.value === _versiondata.RUC_x005f_BAContinent.LookupId
      ));
    youngFellowListItem.RUC_BAPhone = _versiondata.RUC_x005f_BAPhone;
    youngFellowListItem.RUC_BACellPhone = _versiondata.RUC_x005f_BACellPhone;
    youngFellowListItem.RUC_BAEmail = _versiondata.RUC_x005f_BAEmail;
    _versiondata.RUC_x005f_Branch1 !== null &&
      (youngFellowListItem.RUC_Branch1 = allDataBinding.branchofstudy.filter(
        (_e) => _e.value === _versiondata.RUC_x005f_Branch1.LookupId
      ));
    youngFellowListItem.RUC_Branch1Other = _versiondata.RUC_x005f_Branch1Other;
    youngFellowListItem.RUC_Branch1University =
      _versiondata.RUC_x005f_Branch1University;
    youngFellowListItem.RUC_Branch1City = _versiondata.RUC_x005f_Branch1City;
    _versiondata.RUC_x005f_Branch1Country !== null &&
      (youngFellowListItem.RUC_Branch1Country =
        allDataBinding.countryCode.filter(
          (_e) => _e.value === _versiondata.RUC_x005f_Branch1Country.LookupId
        ));
    _versiondata.RUC_x005f_Branch1Continent !== null &&
      (youngFellowListItem.RUC_Branch1Continent =
        allDataBinding.continent.filter(
          (_e) => _e.value === _versiondata.RUC_x005f_Branch1Continent.LookupId
        ));
    youngFellowListItem.RUC_Branch1From =
      _versiondata.RUC_x005f_Branch1From === "1970-01-01T00:00:00Z"
        ? ""
        : _versiondata.RUC_x005f_Branch1From;
    youngFellowListItem.RUC_Branch1To =
      _versiondata.RUC_x005f_Branch1To === "1970-01-01T00:00:00Z"
        ? ""
        : _versiondata.RUC_x005f_Branch1To;
    youngFellowListItem.RUC_Branch1Degree =
      _versiondata.RUC_x005f_Branch1Degree;
    youngFellowListItem.RUC_Branch1DegreeOther =
      _versiondata.RUC_x005f_Branch1DegreeOther;
    youngFellowListItem.RUC_Branch1TitleofBA_MA =
      _versiondata.RUC_x005f_Branch1TitleofBA_x005f_MA;
    _versiondata.RUC_x005f_Branch2 !== null &&
      (youngFellowListItem.RUC_Branch2 = allDataBinding.branchofstudy.filter(
        (_e) => _e.value === _versiondata.RUC_x005f_Branch2.LookupId
      ));
    youngFellowListItem.RUC_Branch2Other = _versiondata.RUC_x005f_Branch2Other;
    youngFellowListItem.RUC_Branch2University =
      _versiondata.RUC_x005f_Branch2University;
    youngFellowListItem.RUC_Branch2City = _versiondata.RUC_x005f_Branch2City;
    _versiondata.RUC_x005f_Branch2Country !== null &&
      (youngFellowListItem.RUC_Branch2Country =
        allDataBinding.countryCode.filter(
          (_e) => _e.value === _versiondata.RUC_x005f_Branch2Country.LookupId
        ));
    _versiondata.RUC_x005f_Branch2Continent !== null &&
      (youngFellowListItem.RUC_Branch2Continent =
        allDataBinding.continent.filter(
          (_e) => _e.value === _versiondata.RUC_x005f_Branch2Continent.LookupId
        ));
    youngFellowListItem.RUC_Branch2From =
      _versiondata.RUC_x005f_Branch2From === "1970-01-01T00:00:00Z"
        ? ""
        : _versiondata.RUC_x005f_Branch2From;
    youngFellowListItem.RUC_Branch2To =
      _versiondata.RUC_x005f_Branch2To === "1970-01-01T00:00:00Z"
        ? ""
        : _versiondata.RUC_x005f_Branch2To;
    youngFellowListItem.RUC_Branch2Degree =
      _versiondata.RUC_x005f_Branch2Degree;
    youngFellowListItem.RUC_Branch2DegreeOther =
      _versiondata.RUC_x005f_Branch2DegreeOther;
    youngFellowListItem.RUC_Branch2TitleofBA_MA =
      _versiondata.RUC_x005f_Branch2TitleofBA_x005f_MA;
    _versiondata.RUC_x005f_Branch3 !== null &&
      (youngFellowListItem.RUC_Branch3 = allDataBinding.branchofstudy.filter(
        (_e) => _e.value === _versiondata.RUC_x005f_Branch3.LookupId
      ));
    youngFellowListItem.RUC_Branch3Other = _versiondata.RUC_x005f_Branch3Other;
    youngFellowListItem.RUC_Branch3University =
      _versiondata.RUC_x005f_Branch3University;
    youngFellowListItem.RUC_Branch3City = _versiondata.RUC_x005f_Branch3City;
    _versiondata.RUC_x005f_Branch3Country !== null &&
      (youngFellowListItem.RUC_Branch3Country =
        allDataBinding.countryCode.filter(
          (_e) => _e.value === _versiondata.RUC_x005f_Branch3Country.LookupId
        ));
    _versiondata.RUC_x005f_Branch3Continent !== null &&
      (youngFellowListItem.RUC_Branch3Continent =
        allDataBinding.continent.filter(
          (_e) => _e.value === _versiondata.RUC_x005f_Branch3Continent.LookupId
        ));
    youngFellowListItem.RUC_Branch3From =
      _versiondata.RUC_x005f_Branch3From === "1970-01-01T00:00:00Z"
        ? ""
        : _versiondata.RUC_x005f_Branch3From;
    youngFellowListItem.RUC_Branch3To =
      _versiondata.RUC_x005f_Branch3To === "1970-01-01T00:00:00Z"
        ? ""
        : _versiondata.RUC_x005f_Branch3To;
    youngFellowListItem.RUC_Branch3Degree =
      _versiondata.RUC_x005f_Branch3Degree;
    youngFellowListItem.RUC_Branch3DegreeOther =
      _versiondata.RUC_x005f_Branch3DegreeOther;
    youngFellowListItem.RUC_Branch3TitleofBA_MA =
      _versiondata.RUC_x005f_Branch3TitleofBA_x005f_MA;
    _versiondata.RUC_x005f_Branch4 !== null &&
      (youngFellowListItem.RUC_Branch4 = allDataBinding.branchofstudy.filter(
        (_e) => _e.value === _versiondata.RUC_x005f_Branch4.LookupId
      ));
    youngFellowListItem.RUC_Branch4Other = _versiondata.RUC_x005f_Branch4Other;
    youngFellowListItem.RUC_Branch4University =
      _versiondata.RUC_x005f_Branch4University;
    youngFellowListItem.RUC_Branch4City = _versiondata.RUC_x005f_Branch4City;
    _versiondata.RUC_x005f_Branch4Country !== null &&
      (youngFellowListItem.RUC_Branch4Country =
        allDataBinding.countryCode.filter(
          (_e) => _e.value === _versiondata.RUC_x005f_Branch4Country.LookupId
        ));
    _versiondata.RUC_x005f_Branch4Continent !== null &&
      (youngFellowListItem.RUC_Branch4Continent =
        allDataBinding.continent.filter(
          (_e) => _e.value === _versiondata.RUC_x005f_Branch4Continent.LookupId
        ));
    youngFellowListItem.RUC_Branch4From =
      _versiondata.RUC_x005f_Branch4From === "1970-01-01T00:00:00Z"
        ? ""
        : _versiondata.RUC_x005f_Branch4From;
    youngFellowListItem.RUC_Branch4To =
      _versiondata.RUC_x005f_Branch4To === "1970-01-01T00:00:00Z"
        ? ""
        : _versiondata.RUC_x005f_Branch4To;
    youngFellowListItem.RUC_Branch4Degree =
      _versiondata.RUC_x005f_Branch4Degree;
    youngFellowListItem.RUC_Branch4DegreeOther =
      _versiondata.RUC_x005f_Branch4DegreeOther;
    youngFellowListItem.RUC_Branch4TitleofBA_MA =
      _versiondata.RUC_x005f_Branch4TitleofBA_x005f_MA;
    youngFellowListItem.RUC_OtherQualifications =
      _versiondata.RUC_x005f_OtherQualifications;
    youngFellowListItem.RUC_FurtherQualifications =
      _versiondata.RUC_x005f_FurtherQualifications;
    youngFellowListItem.RUC_FieldofExpertise = _fieldofExp;
    youngFellowListItem.RUC_LetterofIntent =
      _versiondata.RUC_x005f_LetterofIntent;

    youngFellowListItem.RUC_CV = _versiondata.RUC_x005f_CV;

    youngFellowListItem.RUC_YourPhotograph =
      _versiondata.RUC_x005f_YourPhotograph;

    youngFellowListItem.RUC_PersonalIntroduction =
      _versiondata.RUC_x005f_PersonalIntroduction;
    youngFellowListItem.RUC_ApplicationStatus =
      _versiondata.RUC_x005f_ApplicationStatus;
    youngFellowListItem.RUC_AppliedDate = _versiondata.RUC_x005f_AppliedDate;
    youngFellowListItem.RUC_BAPACheckbox =
      _versiondata.RUC_x005f_BAPACheckbox === null
        ? false
        : _versiondata.RUC_x005f_BAPACheckbox;
    youngFellowListItem.RUC_Branch2Checkbox =
      _versiondata.RUC_x005f_Branch2Checkbox === null
        ? false
        : _versiondata.RUC_x005f_Branch2Checkbox;
    youngFellowListItem.RUC_Branch3Checkbox =
      _versiondata.RUC_x005f_Branch3Checkbox === null
        ? false
        : _versiondata.RUC_x005f_Branch3Checkbox;
    youngFellowListItem.RUC_Branch4Checkbox =
      _versiondata.RUC_x005f_Branch4Checkbox === null
        ? false
        : _versiondata.RUC_x005f_Branch4Checkbox;
    if (resfileArray.length > 0) {
      for (let i = 0; i < resfileArray.length; i++) {
        if (
          resfileArray[i].fileName ===
          youngFellowListItem.RUC_LetterOfNomination
        ) {
          youngFellowListItem.FILE_Content_LetterofNomination = [
            {
              source: resfileArray[i].filepath,
              options: {
                type: "local",
              },
            },
          ];
        }
        if (
          resfileArray[i].fileName === youngFellowListItem.RUC_LetterofIntent
        ) {
          youngFellowListItem.FILE_Content_LetterofIntent = [
            {
              source: resfileArray[i].filepath,
              options: {
                type: "local",
              },
            },
          ];
        }
        if (resfileArray[i].fileName === youngFellowListItem.RUC_CV) {
          youngFellowListItem.FILE_Content_CV = [
            {
              source: resfileArray[i].filepath,
              options: {
                type: "local",
              },
            },
          ];
        }
        if (
          resfileArray[i].fileName === youngFellowListItem.RUC_YourPhotograph
        ) {
          youngFellowListItem.FILE_Content_YourPhotograph = [
            {
              source: resfileArray[i].filepath,
              options: {
                type: "local",
              },
            },
          ];
        }
        if (
          resfileArray[i].fileName ===
          youngFellowListItem.RUC_PersonalIntroduction
        ) {
          youngFellowListItem.FILE_Content_PersonalIntroduction = [
            {
              source: resfileArray[i].filepath,
              options: {
                type: "local",
              },
            },
          ];
        }
      }
    }
  }

  const [formData, setFormData] = React.useState(youngFellowListItem);
  //console.log(youngFellowListItem.RUC_ApplicationStatus);
  ///approver logic always disable
  if (prarentProps?.userRole === "Approver") {
    if (
      (prarentProps?.urlFormMode?.toLowerCase() === "view" ||
        prarentProps?.urlFormMode?.toLowerCase() === "edit") &&
      !(youngFellowListItem?.RUC_ApplicationStatus === "Draft")
    ) {
      formModeDisable = true;
    } else if (
      (prarentProps?.urlFormMode?.toLowerCase() === "view" ||
        prarentProps?.urlFormMode?.toLowerCase() === "edit") &&
      youngFellowListItem?.RUC_ApplicationStatus === "Draft"
    ) {
      formModeDisable = true;
    }
    //else {
    // Swal.fire({
    //   title: `<p style=font-size:18px;color: #61341a;font-weight:500;font-family: 'Euclid Flex';>There is some error in completing this action for the application. Please contact the administrator.</p>`,

    //   showDenyButton: false,
    //   showCancelButton: false,
    //   confirmButtonText: "OK",
    //   backdrop: false,
    // }).then(async (result) => {
    //   /* Read more about isConfirmed, isDenied below */
    //   if (result.isConfirmed) {
    //     window.open(
    //       "https://orfonlineorg.sharepoint.com/sites/FellowshipProgramPortal_QA",
    //       "_self"
    //     );
    //   }
    // });
    // window.open("https://orfonlineorg.sharepoint.com/sites/FellowshipProgramPortal_QA","_self")
    //}
  }
  ///user logic
  if (prarentProps?.userRole === "Guest") {
    if (youngFellowListItem?.RUC_ApplicationStatus === "Draft") {
      if (prarentProps?.formStatus?.toLowerCase() === "open") {
        if (prarentProps?.urlFormMode?.toLowerCase() === "view") {
          formModeDisable = true;
        } else if (prarentProps?.urlFormMode?.toLowerCase() === "edit") {
          formModeDisable = false;
        }
        //else {
        // Swal.fire({
        //   title: `<p style=font-size:18px;color: #61341a;font-weight:500;font-family: 'Euclid Flex';>There is some error in completing this action for the application. Please contact the administrator.</p>`,

        //   showDenyButton: false,
        //   showCancelButton: false,
        //   confirmButtonText: "OK",
        //   backdrop: false,
        // }).then(async (result) => {
        //   /* Read more about isConfirmed, isDenied below */
        //   if (result.isConfirmed) {
        //     window.open(
        //       "https://orfonlineorg.sharepoint.com/sites/FellowshipProgramPortal_QA",
        //       "_self"
        //     );
        //   }
        // });
        //}
      } else {
        if (prarentProps?.formStatus?.toLowerCase() === "closed") {
          formModeDisable = true;
        }
        // Swal.fire({
        //   title: `<p style=font-size:18px;color: #61341a;font-weight:500;font-family: 'Euclid Flex';>There is some error in completing this action for the application. Please contact the administrator.</p>`,

        //   showDenyButton: false,
        //   showCancelButton: false,
        //   confirmButtonText: "OK",
        //   backdrop: false,
        // }).then(async (result) => {
        //   /* Read more about isConfirmed, isDenied below */
        //   if (result.isConfirmed) {
        //     window.open(
        //       "https://orfonlineorg.sharepoint.com/sites/FellowshipProgramPortal_QA",
        //       "_self"
        //     );
        //   }
        // });
      }
    } else {
      if (
        prarentProps?.urlFormMode?.toLowerCase() === "view" ||
        prarentProps?.urlFormMode?.toLowerCase() === "edit"
      ) {
        formModeDisable = true;
      }
      //else {
      // Swal.fire({
      //   title: `<p style=font-size:18px;font-weight:500;color: #61341a;font-family: 'Euclid Flex';>There is some error in completing this action for the application. Please contact the administrator.</p>`,

      //   showDenyButton: false,
      //   showCancelButton: false,
      //   confirmButtonText: "OK",
      //   backdrop: false,
      // }).then(async (result) => {
      //   /* Read more about isConfirmed, isDenied below */
      //   if (result.isConfirmed) {
      //     window.open(
      //       "https://orfonlineorg.sharepoint.com/sites/FellowshipProgramPortal_QA",
      //       "_self"
      //     );
      //   }
      // });
      // window.open("https://orfonlineorg.sharepoint.com/sites/FellowshipProgramPortal_QA","_self")
      //}
    }
  }

  //admin
  if (prarentProps?.userRole === "Admin") {
    if (prarentProps?.urlFormMode?.toLowerCase() === "edit") {
      formModeDisable = false;
    } else if (prarentProps?.urlFormMode?.toLowerCase() === "view") {
      formModeDisable = true;
    }
    //else {
    //   Swal.fire({
    //     title: `<p style=font-size:18px;font-weight:500;color: #61341a;font-family: 'Euclid Flex';>There is some error in completing this action for the application. Please contact the administrator.</p>`,

    //     showDenyButton: false,
    //     showCancelButton: false,
    //     confirmButtonText: "OK",
    //     backdrop: false,
    //   }).then(async (result) => {
    //     /* Read more about isConfirmed, isDenied below */
    //     if (result.isConfirmed) {
    //       let id:any = sessionStorage.getItem('applicationId')?sessionStorage.getItem('applicationId')?.toUpperCase():""
    //       await sp.Error(
    //         prarentProps.formDetails.Title,
    //         id,
    //         "",
    //          `Error: Form mode missing`
    //        );

    //       window.open(
    //         "https://orfonlineorg.sharepoint.com/sites/FellowshipProgramPortal_QA",
    //         "_self"
    //       );
    //     }
    //   });
    // window.open("https://orfonlineorg.sharepoint.com/sites/FellowshipProgramPortal_QA","_self")
    //}
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    control,
    reset,
    getValues,
    setValue,
    //resetField
  } = useForm({
    defaultValues: formData,
    mode: "all",
    shouldUnregister: true,
  });
  //let draftId = "";
  const sp = new spOperation(prarentProps.spfxcontext);

  function updateFields(fields: Partial<FormData>) {
    setFormData((prev: any) => {
      return { ...prev, ...fields };
    });
  }

  const {
    step,
    isFirstStep,
    isLastStep,
    next,
    back,
    currentStepIndex,
    currentheadingindex,
    completedsteps,
    goTo,
    setCurrentheading,
  } = MultiStepForm([
    <PersonalData
      register={register}
      errors={errors}
      allDataBinding={allDataBinding}
      contentTypeField={contentTypeField}
      {...formData}
      control={control}
      updateFields={updateFields}
      formDisable={formModeDisable}
      userRole={prarentProps.userRole}
    />,

    <DetailsOfNominator
      register={register}
      errors={errors}
      allDataBinding={allDataBinding}
      contentTypeField={contentTypeField}
      {...formData}
      control={control}
      updateFields={updateFields}
      formDisable={formModeDisable}
      userRole={prarentProps.userRole}
      wpContext={prarentProps.spfxcontext}
      siteurl={prarentProps.siteurl}
      doclibname={prarentProps.documentLibName}
      author={prarentProps.author}
    />,
    <PrivateAddress
      register={register}
      errors={errors}
      control={control}
      allDataBinding={allDataBinding}
      contentTypeField={contentTypeField}
      {...formData}
      updateFields={updateFields}
      formDisable={formModeDisable}
      userRole={prarentProps.userRole}
      _setValue={setValue}
    />,
    <BusinessAddress
      register={register}
      errors={errors}
      allDataBinding={allDataBinding}
      contentTypeField={contentTypeField}
      {...formData}
      updateFields={updateFields}
      control={control}
      _setValue={setValue}
      formDisable={formModeDisable}
      userRole={prarentProps.userRole}
    />,
    <BranchOfStudy
      register={register}
      errors={errors}
      allDataBinding={allDataBinding}
      contentTypeField={contentTypeField}
      {...formData}
      updateFields={updateFields}
      control={control}
      _setValue={setValue}
      formDisable={formModeDisable}
      userRole={prarentProps.userRole}
      resetFields={reset}
      _formData={formData}
      _getValues={getValues}
      // addBranhofStudy={addBranhofStudy}
      // removeBranchofStudy={removeBranchofStudy}
      // _branch2={branch2}
      // _branch3={branch3}
      // _branch4={branch4}
    />,
    <OtherQualifications
      register={register}
      errors={errors}
      allDataBinding={allDataBinding}
      contentTypeField={contentTypeField}
      {...formData}
      updateFields={updateFields}
      control={control}
      formDisable={formModeDisable}
      userRole={prarentProps.userRole}
    />,
    <UploadDocuments
      control={control}
      register={register}
      errors={errors}
      allDataBinding={allDataBinding}
      contentTypeField={contentTypeField}
      {...formData}
      updateFields={updateFields}
      formDisable={formModeDisable}
      userRole={prarentProps.userRole}
      wpContext={prarentProps.spfxcontext}
      siteurl={prarentProps.siteurl}
      doclibname={prarentProps.documentLibName}
      author={prarentProps.author}
    />,
  ]);

  const onSubmit = async (e: any) => {
    // console.log("isvalid", isValid);
    // console.log("Form errors", errors);
    // e.preventDefault();
    if (!isLastStep && isValid) {
      notify("Redirecting to the next page.");
      reset({ ...getValues() }, { keepValues: true });
      //formmode edit then call sp
      !formModeDisable &&
        (await sp
          .saveAsDraft(
            formData,

            prarentProps.YFlistId,
            prarentProps.userDisplayName,
            "Draft",
            prarentProps.siteName,
            prarentProps.documentLibName,
            prarentProps.formselected,
            prarentProps.formListObj[0].RUC_StartDate,
            prarentProps.formListObj[0].RUC_EndDate,
            prarentProps.userRole,
            prarentProps.formDetails.Title,
            isLastStep,
            prarentProps.HomePage,prarentProps.auditlogList
          )
          .then((res) => {
            if (res === true) {
              //notify("Redirecting to the next page.");
            }
          }));

      return next();
    }

    if (isLastStep && isValid) {
      //formmode edit then call sp
      !formModeDisable &&
        Swal.fire({
          title: `<p style=font-size:18px;font-weight:500> The application with reference no. <span style=font-weight:900>${sessionStorage
            .getItem("applicationId")
            ?.toUpperCase()}</span> will be <span style=font-weight:900>submitted</span> for review.  Do you want to proceed?</p>`,
          showDenyButton: false,
          showCancelButton: true,
          confirmButtonText: "Confirm",
        }).then(async (result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            await sp
              .saveAsDraft(
                formData,

                prarentProps.YFlistId,
                prarentProps.userDisplayName,
                "Submitted",
                prarentProps.siteName,
                prarentProps.documentLibName,
                prarentProps.formselected,
                prarentProps.formListObj[0].RUC_StartDate,
                prarentProps.formListObj[0].RUC_EndDate,
                prarentProps.userRole,
                prarentProps.formDetails.Title,
                isLastStep,
                prarentProps.HomePage,prarentProps.auditlogList
              )
              .then((isSuccess: boolean) => {
                //console.log(res)
                if (isSuccess) {
                  Swal.fire({
                    icon: "success",
                    title: `<p style=font-size:18px;font-weight:500>The application with reference no. <span font-weight:900>
                    ${sessionStorage
                      .getItem("applicationId")
                      ?.toUpperCase()}</span> is <span font-weight:900>submitted</span> successfully.</p>`,
                    // text:  `Application Id <${
                    //   sessionStorage.getItem("applicationId")?.split("/")[1]
                    // }> submitted successfully`,
                  }).then(async (result) => {
                    /* Read more about isConfirmed, isDenied below */
                    if (result.isConfirmed) {
                      let id: any = sessionStorage.getItem("applicationId")
                        ? sessionStorage.getItem("applicationId")?.toUpperCase()
                        : "";
                      await sp.Log(
                        prarentProps.formDetails.Title,
                        id,
                        "Submitted",
                        `Application id ${id} submitted successfully`,
                        prarentProps.HomePage,prarentProps.auditlogList
                      );
                      if (prarentProps.userRole === "Admin") {
                        window.open(prarentProps.AdminPage, "_self");
                      } else {
                        window.open(prarentProps.MyApplication, "_self");
                      }
                    }
                  });
                } else {
                  Swal.fire({
                    icon: "warning",
                    title: "Warning",
                    text: "There is some error in completing this action for the application. Please contact the administrator.",
                  }).then(async (result) => {
                    /* Read more about isConfirmed, isDenied below */
                    if (result.isConfirmed) {
                      let id: any = sessionStorage.getItem("applicationId")
                        ? sessionStorage.getItem("applicationId")?.toUpperCase()
                        : "";
                      await sp.Error(
                        prarentProps.formDetails.Title,
                        id,
                        formData.RUC_ApplicationStatus,
                        `Error: Application id ${id} was not submitted`,
                        prarentProps.HomePage,prarentProps.auditlogList
                      );

                      window.open(prarentProps.MyApplication, "_self");
                    }
                  });
                }
              });
          }
        });
      //return alert("form is getting submitted");
      //submit data
    }
  };

  const handleDraft = async () => {
    notify("Save as Draft");
    //formmode edit then call sp
    !formModeDisable &&
      (await sp
        .saveAsDraft(
          formData,

          prarentProps.YFlistId,
          prarentProps.userDisplayName,

          "Draft",
          prarentProps.siteName,
          prarentProps.documentLibName,
          prarentProps.formselected,
          prarentProps.formListObj[0].RUC_StartDate,
          prarentProps.formListObj[0].RUC_EndDate,
          prarentProps.userRole,
          prarentProps.formDetails.Title,
          isLastStep,
          prarentProps.HomePage,prarentProps.auditlogList
        )
        .then((success: boolean) => {
          success
            ? Swal.fire({
                title: `<p style=font-size:18px; font-weight:500; color: #61341a;font-family: 'Euclid Flex';> The application with reference no. <span font-weight:900>
            ${sessionStorage
              .getItem("applicationId")
              ?.toUpperCase()}</span> is <span font-weight:900>saved</span> successfully.</p>`,

                showDenyButton: false,
                showCancelButton: false,
                confirmButtonText: "OK",
                backdrop: false,
              }).then(async (result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                  let id: any = sessionStorage.getItem("applicationId")
                    ? sessionStorage.getItem("applicationId")?.toUpperCase()
                    : "";
                  await sp.Log(
                    prarentProps.formDetails.Title,
                    id,
                    formData.RUC_ApplicationStatus,
                    `Application id ${id} saved successfully`,
                    prarentProps.HomePage,prarentProps.auditlogList
                  );
                  if (prarentProps.userRole === "Admin") {
                    window.open(prarentProps.AdminPage, "_self");
                  } else {
                    window.open(prarentProps.MyApplication, "_self");
                  }
                }
              })
            : Swal.fire({
                title: `<p style=font-size:18px; font-weight:500; color: #61341a;font-family: 'Euclid Flex';> There is some error in completing this action for the application. Please contact the administrator.</p>`,

                showDenyButton: false,
                showCancelButton: false,
                confirmButtonText: "OK",
                backdrop: false,
              }).then(async (result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                  let id: any = sessionStorage.getItem("applicationId")
                    ? sessionStorage.getItem("applicationId")?.toUpperCase()
                    : "";
                  await sp.Error(
                    prarentProps.formDetails.Title,
                    id,
                    formData.RUC_ApplicationStatus,
                    `Error : Application Id ${id} was not saved`,
                    prarentProps.HomePage,prarentProps.auditlogList
                  );
                  if (prarentProps.userRole === "Admin") {
                    window.open(prarentProps.AdminPage, "_self");
                  } else {
                    window.open(prarentProps.MyApplication, "_self");
                  }
                }
              });
        }));
    // draftId = draftResponse.Id; const draftResponse =
  };

  // function UpdateBranchofStudyFields(
  //   index: number,
  //   value: string,
  //   internalName: string
  // ) {
  //   let data: any = [...formData.RUC_BranchofStudy];
  //   data[index][internalName] = value;
  //   const obj: { [key: string]: any } = {};
  //   obj["RUC_BranchofStudy"] = data;
  //   updateFields(obj);
  // }
  const notify = (message: string) => {
    toast(message);
  };

  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={2500}
        newestOnTop={false}
      />
      <Header
        mainTitle={
          prarentProps.formselected == "RYFP"
            ? "RAISINA YOUNG FELLOWS PROGRAMME"
            : "Raisina Forum for Future of Diplomacy"
        }
        imageURL={prarentProps.formDetails.RUC_FellowshipImage}
      />
      <div className={`d-flex ${formStyles.outerContainer}`}>
        <Navigation
          currentstepindex={currentStepIndex}
          currentheadingindex={currentheadingindex}
          completedsteps={completedsteps}
          goToStep={goTo}
          applicationStatus={youngFellowListItem.RUC_ApplicationStatus}
          setCurrentheading={setCurrentheading}
        />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={formStyles.formContainer}
        >
          <fieldset>{step}</fieldset>
          {
            <div
              className={`mt-0 position-relative ${formStyles.buttonContainer}`}
            >
              {!isFirstStep && (
                <button
                  className={`${buttonStyles.formButton} ${buttonStyles.firstButton} position-absolute`}
                  type="button"
                  onClick={back}
                >
                  Go back
                </button>
              )}
              {!formModeDisable && !(prarentProps.userRole === "Approver") && (
                <button
                  onClick={handleDraft}
                  type="button"
                  className={`${buttonStyles.yellowOutlineButton} ${buttonStyles.formButton} ${buttonStyles.middleButton} position-absolute`}
                >
                  Save as Draft
                </button>
              )}
              {!isLastStep ? (
                <button
                  className={`${buttonStyles.formButton} ${buttonStyles.lastButton} position-absolute`}
                  type="submit"
                >
                  {/* <ClipLoader className={`m-2`} size={16} color="#61341a" /> */}
                  {isLastStep
                    ? "Submit"
                    : formModeDisable
                    ? "Next"
                    : "Save and Proceed"}
                </button>
              ) : formModeDisable ? (
                <></>
              ) : (
                <button
                  className={`${buttonStyles.formButton} ${buttonStyles.lastButton} position-absolute`}
                  type="submit"
                >
                  {/* <ClipLoader className={`m-2`} size={16} color="#61341a" /> */}
                  {isLastStep
                    ? "Submit"
                    : formModeDisable
                    ? "Next"
                    : "Save and Proceed"}
                </button>
              )}
            </div>
          }
        </form>
      </div>
      {/* <pre>{console.log("FormState:", JSON.stringify(formData))}</pre> */}
      {/* <pre>{JSON.stringify(formData)}</pre> */}
    </>
  );
};
