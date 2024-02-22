export default class CountryModel {
    name?: CountryNameModel
    flag?: string
    flags?: CountryFlagModel
    capital?: Array<string>
    altSpellings?: Array<string>
}

export class CountryNameModel {
    common?: string
    official?: string
}

export class CountryFlagModel {
    alt?: string
    png?: string
    svg?: string
}