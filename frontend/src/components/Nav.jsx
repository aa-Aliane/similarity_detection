import React from "react";
import { useLanguage } from "../store/LanguageState";
import { useLayout } from "../store/LayoutState";
import { useModel } from "../store/ModelState";
import { useNavigate } from "react-router-dom";

const Nav = () => {
  //   useLanguage methods and variables
  const lang = useLanguage((state) => state.current_language);
  const languages = useLanguage((state) => state.languages);
  const text = useLanguage((state) => state.text.nav);
  const change_language = useLanguage((state) => state.change_language);
  const current_layout = useLayout((state) => state.current_layout);
  const set_current_layout = useLayout((state) => state.set_current_layout);
  const set_suspicious = useModel((state) => state.set_suspicious);
  const { multiLang, switchMultiLang } = useModel();

  const navigate = useNavigate();

  // handles language change
  const HandleLanguageChange = (l) => {
    change_language(l);
  };
  // handles layout change
  const HandleLayoutChange = (l) => {
    set_suspicious("");
    console.log("first", l);

    set_current_layout(l);
    navigate(l === "interface" ? "" : l);
  };
  return (
    <div className="header">
      <nav className="nav">
        <ul className="nav__items">
          <li>
            <a
              data-current={current_layout === "interface"}
              className="a a--nav"
              href="#"
              onClick={() => HandleLayoutChange("interface")}
            >
              {text.home}
            </a>
          </li>
          <li>
            <a
              data-current={current_layout === "about"}
              className="a a--nav"
              href="#"
              onClick={() => HandleLayoutChange("about")}
            >
              {text.about}
            </a>
          </li>
          <li>
            <a
              data-current={current_layout === "api"}
              className="a a--nav"
              href="#"
              onClick={() => HandleLayoutChange("api")}
            >
              {text.api}
            </a>
          </li>
        </ul>
        <h3 className="nav__title">{text.title}</h3>
        {/* language settings */}
        <div>
          <select name="" id="">
            {Object.keys(languages).map((l) => {
              console.log(l);
              if (lang == l) {
                return (
                  <option
                    value="{l}"
                    selected
                    onClick={() => HandleLanguageChange(l)}
                  >
                    {l}
                  </option>
                );
              }
              return (
                <option value="{l}" onClick={() => HandleLanguageChange(l)}>
                  {l}
                </option>
              );
            })}
          </select>
        </div>
      </nav>
      {current_layout === "interface" ? (
        <div className="header__menu">
          <label class="form-control">
            <input
              type="checkbox"
              name="checkbox"
              onClick={() => switchMultiLang()}
              checked={multiLang}
            />
            multilang indexation
          </label>
        </div>
      ) : null}
    </div>
  );
};

export default Nav;
