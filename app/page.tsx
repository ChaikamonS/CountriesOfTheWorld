"use client";

import Image from "next/image";
import styles from "./page.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import CountryModel from "./model/CountryModel";
import { Backdrop, CircularProgress, TextField } from "@mui/material";
import CountryTableComponent from "./component/CountryTableComponent";

export default function Home() {
  const [list, setList] = useState<Array<CountryModel>>([]);
  const [mouted, setMouted] = useState<boolean>(false)
  const [isLoad, setIsLoad] = useState<boolean>(false)

  const [searchText, setSearchText] = useState<string>("");

  useEffect(() => {
    setMouted(true)

    setIsLoad(true)
    GetList(() => {
      setIsLoad(false)
    }, () => {
      setIsLoad(false)
    });
  }, []);

  if (!mouted) {
    return <div className="loadingPage">
      Page loading...
    </div>
  }

  return (
    <main className={styles.main}>
      <h1>Countries of the World</h1>

      <TextField
        sx={{ width: "100%", maxWidth: "500px" }}
        size="small"
        label="Search by common name and capital city"
        onChange={(event) => {
          setSearchText(event.target.value);
        }}
      />

      <div style={{ width: '100%', maxWidth: '700px', paddingTop: '30px' }}>
        <CountryTableComponent
          countryList={list.filter(
            (item) =>
              item.name?.common
                ?.toUpperCase()
                .includes(searchText.toUpperCase()) ||
              item.capital
                ?.toString()
                ?.toUpperCase()
                .includes(searchText.toUpperCase())
          )}
        />
      </div>

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoad}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </main>
  );

  function GetList(callback: () => void, error: () => void) {
    // let url = "https://restcountries.com/v3.1/name/thailand"
    let url = "https://restcountries.com/v3.1/all";
    axios
      .get(url)
      .then(function (response) {
        if (response.status == 200) {
          try {
            const data = response.data as Array<CountryModel>;
            console.log(data);

            setList(data);
            callback()
          } catch (err) {
            console.log("Data parse error: ", err);

            error()
          }
        } else {
          console.log(
            `Error status: ${response.status} message: ${response.statusText}`
          );

          error()
        }
      })
      .catch(function (err) {
        console.log(err);

        error()
      })
  }
}
