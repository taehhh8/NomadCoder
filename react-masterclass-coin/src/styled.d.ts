// import original module declarations
import "styled-components";

// and extend them!
declare module "styled-components" {
  export interface DefaultTheme {
    bgColor: "#2f3640",
    textColor: "#f5f6fa",
    accentColor: "#4cd137",
  }
}
