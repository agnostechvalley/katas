defmodule HandsTest do
  use ExUnit.Case

  test "it can convert a two character hand to tuple of atoms" do
    assert Hands.card_to_tuple("2H") == {:two, :heart}
  end

  test "it will assert if an unexpected hand is used" do
    assert_raise RuntimeError, fn ->
      Hands.card_to_tuple("2F")
    end
  end
end
