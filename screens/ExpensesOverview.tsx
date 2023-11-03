import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import RecentExpenses from "./RecentExpenses";
import AllExpenses from "./AllExpenses";
import { GlobalStyles } from "../constants/styles";
import { Ionicons } from "@expo/vector-icons";
import IconButton from "../components/UI/IconButton";
import { useNavigation } from "@react-navigation/native";

type Props = {};

const BottomTabs = createBottomTabNavigator();
const ExpensesOverview = (props: Props) => {
  return (
    <BottomTabs.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: {
          backgroundColor: GlobalStyles.colors.primary500,
        },
        headerTintColor: "white",
        tabBarStyle: {
          backgroundColor: GlobalStyles.colors.primary500,
        },
        tabBarActiveTintColor: GlobalStyles.colors.accent500,
        headerRight: ({ tintColor }) => {
          return (
            <IconButton
              icon="add"
              size={24}
              color={tintColor}
              onPress={() => {
                navigation.navigate("ManageExpenses", {
                  expense: {
                    id: Math.random().toString(),
                    description: "New Expense",
                    amount: 0,
                    date: new Date(),
                  },
                });
              }}
            />
          );
        },
      })}
    >
      <BottomTabs.Screen
        name="RecentExpenses"
        component={RecentExpenses}
        options={{
          title: "Recent Expenses",
          tabBarLabel: "Recent",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="hourglass" size={size} color={color} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="AllExpenses"
        component={AllExpenses}
        options={{
          title: "All expenses",
          tabBarLabel: "All",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar" size={size} color={color} />
          ),
        }}
      />
    </BottomTabs.Navigator>
  );
};

export default ExpensesOverview;
