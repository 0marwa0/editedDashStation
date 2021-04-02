// Aritcle page //

import React, { useState, useEffect, useHistory } from "react";
import ArticlesColumns from "./Config.js";
import { ArticlesData } from "../../fakeData";
import CustomPage from "../shared/CustomPage";
import { DateName } from "../Dashboard";

import "react-responsive-modal/styles.css";
import { Mesg, FailedMesg } from "../../API/APIMessage";
import { LoadData } from "../../API";
import { monthNames } from "../shared/assets";
function Aritcle(props) {
  const [Loading, setLoading] = useState(false);
  const [data, setdata] = useState([]);
  const [Filterdata, setFilterdata] = useState([]);
  // let history = useHistory();
  const loadArticle = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      let Articles = [];
      ArticlesData.map((item) => {
        Articles.push({
          id: item.id,
          image: item.image,
          Title: item.Title,
          CreatedDate: item.CreatedDate,

          Createdby: item.Createdby,
        });
      });
      setdata(Articles);
      setFilterdata(Articles);
    }, 1200);
    // LoadData(
    //   "articles",
    //   (err, data) => {
    //     if (err) {
    //       Mesg(err);
    //       setLoading(false);
    //     } else {
    //       setLoading(false);
    //   },
    //   (err) => {
    //     FailedMesg(err, "Something worng happend !");
    //   }
    // );

    //  }
    //   },
    //   (err) => {
    //     setLoading(false);
    //     FailedMesg(err, "Something worng happend !");
    //   }
    // );
  };
  const [FilterdData, setFilterdData] = useState([]);

  useEffect(() => {
    loadArticle();
    // if (localStorage.getItem("station_token")) {
    // } else {
    //   props.history.push("/login");
    // }
  }, []);
  const [searchText, setsearchText] = useState("");

  const HandleSearch = (e) => {
    let value = e.target.value;
    setsearchText(value);
    if (value) {
      setFilterdata(data);
    }
  };

  const Filter = () => {
    let newData = data.filter((item) =>
      item.Title.toLowerCase().includes(searchText.toLowerCase())
    );
    console.log(data, searchText);

    setFilterdata(newData);
  };
  const onOpen = (value) => {
    props.history.push("/");
  };

  return (
    <div>
      <CustomPage
        pageTitle="articles"
        columns={ArticlesColumns}
        Item="aritcle"
        Loading={Loading}
        data={Filterdata}
        onOpenModal={
          () => console.log("")
          //props.history.push("/createarticle")
        }
        HandleSearch={HandleSearch}
        filter={Filter}
      />
    </div>
  );
}

export default Aritcle;
