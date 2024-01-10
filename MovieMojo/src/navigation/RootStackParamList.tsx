import type {
    BottomTabNavigationProp,
    BottomTabScreenProps,
  } from "@react-navigation/bottom-tabs";
import { StreamingService } from "../types/types";
  
  export type RootStackParamList = {
    HomeScreen: undefined;
    Search: undefined;
    WatchList: undefined;
    Profile: undefined;
    MoviePage: {
        uri: string;
        title: string;
        description: string;
        genreList: string[];
        releaseYear: string;
        streamingList: StreamingService[];
      };
  };

  export type RootStackParamLoginList = {
    Prelogin: undefined;
    Login: undefined;
  }
  
  export type ScreenNavigationProps = BottomTabNavigationProp<RootStackParamList>;

  export type LoginScreenNavigationProps = BottomTabNavigationProp<RootStackParamLoginList>;

  
  export type MoviePageProps = BottomTabScreenProps<
    RootStackParamList,
    "MoviePage"
  >;

  