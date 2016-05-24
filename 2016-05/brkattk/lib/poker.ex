defmodule Poker do

  def get_winner(game) do
    game
    |> parse_input
    |> parse_hands
  end

  def parse_hands({black, white}) do
    %{black: Hand.parse_hand(black),
      white: Hand.parse_hand(white)}
  end

  defp parse_input(input) do
    [_,black,white] = String.split(input, ~r/[[:alpha:]]+: /)
    {black, white}
  end
end
