import { COLORS } from "./config";

export const HeaderStyle = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 30,
    paddingHorizontal: 20,
    backgroundColor: COLORS.COLOR_SECOND,
    height: 90,
    alignItems: "center",
}

export const InputStyle = {
    width: "100%",
    height: 40,
    borderRadius: 10,
    backgroundColor: COLORS.COLOR_SECOND,
    marginTop: 10,
    paddingHorizontal: 10,
    color: "white"
}

export const ButtonStyle = {
    borderRadius: 10,
    marginTop: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    backgroundColor: COLORS.COLOR_BLUE
}