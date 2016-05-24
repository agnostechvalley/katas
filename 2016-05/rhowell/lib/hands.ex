defmodule Hands do

  def parse_game(game) do
    [_,b,w] = String.split(game, ~r/[[:alpha:]]+: /)

    %{black: Enum.map(String.split(b), &(card_to_tuple(&1))),
      white: Enum.map(String.split(w), &(card_to_tuple(&1)))}
  end

  def card_to_tuple(<<value,suit>>) do
    {value_to_atom(value),
     suit_to_atom(suit)}
  end

  def value_to_atom(?2), do: :two
  def value_to_atom(?3), do: :three
  def value_to_atom(?4), do: :four
  def value_to_atom(?5), do: :five
  def value_to_atom(?6), do: :six
  def value_to_atom(?7), do: :seven
  def value_to_atom(?8), do: :eight
  def value_to_atom(?9), do: :nine
  def value_to_atom(?T), do: :ten
  def value_to_atom(?J), do: :jack
  def value_to_atom(?Q), do: :queen
  def value_to_atom(?K), do: :king
  def value_to_atom(?A), do: :ace
  def value_to_atom(other) do
    raise "Unexpected card value: #{other}"
  end

  def suit_to_atom(?C), do: :club
  def suit_to_atom(?D), do: :diamond
  def suit_to_atom(?H), do: :heart
  def suit_to_atom(?S), do: :spade
  def suit_to_atom(other) do
    raise "Unexpected card suit: #{other}"
  end
end
