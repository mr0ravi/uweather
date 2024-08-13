import Component, { PageEl } from '@/components/Libs/Component';
import Copy from '@/components/Libs/Copy';
import Router from 'next/router'
import Window from '@/components/Libs/Window';
import TextBox from '@/components/Libs/TextBox';
import Icon2Titles from '@/components/Libs/Icon2Titles';
import Icon3Titles from '@/components/Libs/Icon3Titles';


export default p => Component(p, Page);
const Page: PageEl = (props, state, refresh, getProps) => {

  let styles = global.styles
  let name = "weather"


  return (
    <div style={{ direction: "rtl", minHeight: "11vh", }}>
      <br-x />
      <Window title={name} style={{ minHeight: 200, margin: 10, width: "calc(100% - 20px)" }}>
        <pre style={{ direction: "ltr" }}>
          <div style={{ borderBottom: "3px solid black", fontSize: 19, paddingTop: "0.5rem", paddingBottom: "0.5rem" }}>
            location:{props.city.country[0].value}-{props.city.region[0].value}-{props.city.areaName[0].value}                                 local time:{props.local.localObsDateTime}
          </div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div style={{ left: 0, backgroundColor: "lightblue", width: "28.2415%", height: "8.5rem", paddingTop: "0.5%", paddingLeft: "0.5%", float: "left" }}>
              temp-C:{props.local.temp_C}°
              <img src="/sun.png" alt="sun" style={{ height: 100, marginTop: "-1.15rem", float: "right", paddingRight: "0.5%" }} />
              <br />
              <br-x />
              <br-xxx />
              temp-F:{props.local.temp_F}°
              <br />
              <br-x />
              <br-xxx />
              humidity:{props.local.humidity}%
              <br />
              <br-x />
              <br-xxx />
              precipitation:{props.local.precipMM}mm
              <br />
              <br-x />
              <br-xxx />
              <b style={{ fontSize: 20, fontWeight: 20 }}>{props.local.weatherDesc[0].value}</b>
            </div>
            <div style={{ backgroundColor: "lightgreen", width: "28.2415%", marginLeft: " 1rem", height: "8.5rem", paddingLeft: "0.5%" }}>
              wind: {props.local.winddir16Point} {props.local.windspeedKmph}Km/h
              <img src='/wind.svg' style={{ height: 50, float: "right", marginTop: "0.5rem", paddingRight: "0.5%", width: 80 }}></img>
              <br />
              <br />
              <br-xx />
              <br-xxx />
              Wind Gusts:{props.local.windspeedKmph}Km/h
              <br />
              <br />
              <br-xx />
              <br-xxx />
              Wind Gusts(Mph):{props.local.windspeedMiles}Mph
              <br />
              <br />
              <br-xx />
              <br-xxx />
              wind direction:{props.local.winddirDegree}°
            </div>
            <div style={{ backgroundColor: "lightcoral", float: "right", marginLeft: "1rem", width: "40%", paddingLeft: "0.5%", height: "8.5rem" }}>
              Pressure:{props.local.pressure}mb
              <br />
              <br-xxx />
              <br-xx/>
              <br />
              UV index:{props.local.uvIndex} Moderate
              <br />
              <br-xxx />
              <br-xx/>
              <br />
              visibility:{props.local.visibility}Km
              <br />
              <br-xxx />
              <br-xx/>
              <br />
              Cloud Cover:{props.local.cloudcover}%
              <div style={{ float: "right", marginTop: "-6.5rem", }}>
                <strong style={{ fontSize: 22, position: "absolute", marginLeft: "-7.5rem" }}>sun:</strong>  <b style={{ marginLeft: "-5rem" }}>Rise:{props.sunMoon.astronomy[0].sunrise} </b>
                <br-xxxx />
                <b style={{ marginLeft: "-4.1rem" }}>set:{props.sunMoon.astronomy[0].sunset} </b>
                <br-xxx />
                <div style={{ float: "right", display: "flex", flexDirection: "column", marginRight: "0.3rem" }}>
                  <img src='/1.svg' style={{ height: 30, width: 30, marginLeft: "3rem", marginTop: "-2rem", }}></img>
                  <br />
                  <br />
                  <br-x />
                  <img src='/2.svg' style={{ height: 30, width: 30, marginLeft: "3rem", }}></img>
                </div>
                <br />
                <br />
                <br-xxx/>
                <strong style={{ fontSize: 22, position: "absolute", marginLeft: "-8.25rem", marginTop: "0.4rem" }}>moon:</strong>  <b style={{ marginLeft: "-5rem", }}>Rise:{props.sunMoon.astronomy[0].moonrise} </b>
                <br-xxxx />
                <b style={{ marginLeft: "-4.1rem" }}>set:{props.sunMoon.astronomy[0].moonset} </b>
                <br-xxxx />
                <b style={{ marginLeft: "-4.1rem" }}>{props.sunMoon.astronomy[0].moon_phase} </b>

              </div>
            </div>
          </div>
        </pre>
      </Window>
    </div>
  )
}


export async function getServerSideProps(context) {


  var session = await global.SSRVerify(context)
  var { uid, name, image, imageprop, lang, cchar,
    unit, workspace, servid, servsecret,
    usedquota, quota, quotaunit, status, regdate, expid,
    role, path, devmod, userip, } = session;

  let res = await fetch("https://irmapserver.ir/research/api/weather/")
  let data = await res.json()
  let city = data.nearest_area[0]
  let local = data.current_condition[0]
  let sunMoon = data.weather[0]


  return {
    props: {
      data: global.QSON.stringify({
        city,
        local,
        session,
        sunMoon,

        // nlangs,
      })
    },
  }
}