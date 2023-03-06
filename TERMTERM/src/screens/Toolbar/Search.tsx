import { TouchableOpacity, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "@interfaces/RootStackParamList";

export type Props = StackScreenProps<RootStackParamList, "ToolBar">;

const Search = ({ navigation }: Props) => {
  return (
    <SafeAreaView>
      <TouchableOpacity
        onPress={() => navigation.push("Curation")}
        style={{ height: 3000 }}
      >
        <Text> 눌러라 그럼 열릴 것이다</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Search;
