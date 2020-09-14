import React from "react"

const contextTestOne = {
	name: "chen",
	length: 22,
}

export const wrapContext = React.createContext(contextTestOne.name)
