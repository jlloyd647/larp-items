import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Player } from "@/types";

type SelectedPlayer = {
  selectedPlayer: Player;
}

export const PlayerForm = ({selectedPlayer} : SelectedPlayer) => {
  return (
    <Card className="w-[1000px] h-[451px]">
      <CardHeader>
        <CardTitle>{selectedPlayer?.name}</CardTitle>
        <CardDescription>Huh</CardDescription>
      </CardHeader>
      <CardContent>

      </CardContent>
    </Card>
  )
}

export default PlayerForm;