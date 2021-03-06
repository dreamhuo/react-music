import {
    GraphQLString,
    GraphQLInt,
    GraphQLObjectType
} from 'graphql'
import { SearchType } from './model'
import { Albums } from '../album/model'
import { Artists } from '../artist/model'
import { Mvs } from '../mv/model'
import { Songs } from '../song/model'
import api from '../../api'

const searchArgs = {
    keywords: {
        type: GraphQLString
    },
    limit: {
        type: GraphQLInt
    },
    offset: {
        type: GraphQLInt
    },
    type: {
        type: GraphQLInt
    }
}

const searchResult = {
    type: SearchType,
    args: searchArgs,
    async resolve(root, args) {
        try {
            let res = await api.search(args)
            return res.result
        } catch (e) {
            console.log(e)
        }
    }
}

const searchSuggest = {
    type: new GraphQLObjectType({
        name: 'SearchSuggest',
        fields: {
            songs: {
                type: Songs
            },
            albums: {
                type: Albums
            },
            artists: {
                type: Artists
            },
            mvs: {
                type: Mvs
            }
        }
    }),
    args: searchArgs,
    async resolve(root, args) {
        try {
            let res = await api.searchSuggest(args)
            return res.result
        } catch (e) {
            console.log(e)
        }
    }
}

export default {
    searchResult,
    searchSuggest
}