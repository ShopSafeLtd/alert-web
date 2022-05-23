import { Age, Build, Gender, Race } from "graphql/generated";

export const getOffenderGender = (gender: Gender|undefined|null) => {
  if (gender === Gender.Female)
    return 'Female'
  if (gender === Gender.Male)
    return 'Male'
  return 'Unknown'
}

export const getOffenderRace = (race: Race|undefined|null, short?: boolean) => {
  if (race === Race.Ic1)
    return short ? 'IC1' : 'IC1 - White - North European'
  if (race === Race.Ic2)
    return short ? 'IC2' : 'IC2 - White - South European'
  if (race === Race.Ic3)
    return short ? 'IC3' : 'IC3 - Black'
  if (race === Race.Ic4)
    return short ? 'IC4' : 'IC4 - South Asian'
  if (race === Race.Ic5)
    return short ? 'IC5' : 'IC5 - Southeast Asian'
  if (race === Race.Ic6)
    return short ? 'IC6' : 'IC6 - North African or Arab'
  return 'Unknown'
}

export const getOffenderBuild = (build: Build|undefined|null) => {
  if (build === Build.Large)
    return 'Large'
  if (build === Build.Medium)
    return 'Medium'
  if (build === Build.Small)
    return 'Small'
  return 'Unknown'
}

export const getOffenderAge = (age: Age|undefined|null) => {
  if (age === Age.EighteenThirty)
    return '18 - 30'
  if (age === Age.FiftySixty)
    return '50 - 60'
  if (age === Age.FortyFifty)
    return '40 - 50'
  if (age === Age.OverEighty)
    return 'Over 80'
  if (age === Age.SeventyEighty)
    return '70 - 80'
  if (age === Age.SixtySeventy)
    return '60 - 70'
  if (age === Age.ThirtyForty)
    return '30 - 40'
  if (age === Age.UnderEighteen)
    return 'Under 18'
  return 'Unknown'
}