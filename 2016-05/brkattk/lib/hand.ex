defmodule Hand do
  def parse_hand(hand) do
    Enum.map(String.split(hand), &(card_to_tuple(&1)))
      |> sort_hand
      |> hand_to_tuple
  end

  def sort_hand(hand) do
    Enum.sort(hand, fn(x, y) -> card_value(elem(x,0)) > card_value(elem(y, 0)) end)
  end

  def hand_to_tuple(hand) do
    {hand_type(hand), high_card(hand)}
  end

  def high_card(hand) do
    elem(List.first(hand),0)
  end

  def card_to_tuple(<<value,suit>>) do
    {value_to_atom(value), suit_to_atom(suit)}
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

  def hand_type([{v1, suit},
                 {v2, suit},
                 {v3, suit},
                 {v4, suit},
                 {v5, suit}]) do
    flush_type(v1, v2, v3, v4, v5)
  end

  def hand_type([{v1, _},
                 {v1, _},
                 {v1, _},
                 {v2, _},
                 {v2, _}]) do
    :full_house
  end

  def hand_type([{v1, _},
                 {v1, _},
                 {v1, _},
                 {_v2, _},
                 {_v3, _}]) do
    :three_of_a_kind
  end

  def hand_type([{v1, _},
                 {v1, _},
                 {v2, _},
                 {v2, _},
                 {_v3, _}]) do
    :two_pair
  end

  def hand_type([{v1, _},
                 {v1, _},
                 {_v2, _},
                 {_v3, _},
                 {_v4, _}]) do
    :pair
  end

  def hand_type([{v1, _},
                 {v2, _},
                 {v3, _},
                 {v4, _},
                 {v5, _}]) do
    if is_straight(Enum.map([v1, v2, v3, v4, v5], &card_value/1)) do
      :straight
    else
      :high_card
    end
  end

  def flush_type(:ace, :king, :queen, :jack, :ten) do
    :royal_flush
  end

  def flush_type(v1, v2, v3, v4, v5) do
    if is_straight(Enum.map([v1, v2, v3, v4, v5], &card_value/1)) do
      :straight_flush
    else
      :flush
    end
  end

  def is_straight(list), do: is_sequential_descending(list)

  def is_sequential_descending([first, second | tail]), do: second == first + 1 && is_sequential_descending [second | tail]
  def is_sequential_descending(_), do: true

  def card_value(:two), do: 0
  def card_value(:three), do: 1
  def card_value(:four), do: 2
  def card_value(:five), do: 3
  def card_value(:six), do: 4
  def card_value(:seven), do: 5
  def card_value(:eight), do: 6
  def card_value(:nine), do: 7
  def card_value(:ten), do: 8
  def card_value(:jack), do: 9
  def card_value(:queen), do: 10
  def card_value(:king), do: 11
  def card_value(:ace), do: 12
  def card_value(card) do
    raise "Unexpected card #{card}"
  end
end
