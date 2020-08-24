## This is just a demo script so that I can understand how UniSwap works
class Dex
  attr_accessor :liquidity, :fee
  def initialize(x, y)
    @liquidity = {}
    @liquidity = {x:x, y:y}
    @fee = 0.0025
  end

  # x * y = k
  def k(x,y)
    x * y
  end

  def xPrice
    liquidity[:y].to_f / liquidity[:x]
  end

  def yPrice
    liquidity[:x].to_f / liquidity[:y]
  end


  def price(input_amount, input_reserve, output_reserve)
    input_amount_minus_fee = input_amount * (1 - fee)
    numerator = k(input_reserve, output_reserve)
    denominator = input_reserve + input_amount_minus_fee
    res = (numerator / denominator).round(2)
    puts "#{res} = #{numerator} / #{denominator}"
    res
  end

  def x_to_y(x)
    before = liquidity.dup
    liquidity[:x]= liquidity[:x] + x
    new_balance = price(x, liquidity[:x] - x, liquidity[:y])
    out = liquidity[:y] - new_balance
    liquidity[:y]= new_balance
    p "#{before} -> IN: #{x} x OUT: #{out} y -> #{liquidity}"
  end

  def y_to_x(y)
    before = liquidity.dup
    liquidity[:y]= liquidity[:y] + y
    new_balance = price(y, liquidity[:y] - y, liquidity[:x])
    out = liquidity[:x] - new_balance
    liquidity[:x]= new_balance
    p "#{before} -> IN: #{y} y OUT: #{out} x -> #{liquidity}"
  end
end

p "ETH TO Baloon"

dex = Dex.new(1000000,1000000)
p "Price #{dex.xPrice()}  #{dex.yPrice()}"
dex.x_to_y(1000)
p "Price #{dex.xPrice()}  #{dex.yPrice()}"

p "ETH TO OMG"
dex2 = Dex.new(10,500)
p "Price #{dex2.xPrice()}  #{dex2.yPrice()}"
dex2.x_to_y(1)
p "Price #{dex2.xPrice()}  #{dex2.yPrice()}"
dex2.y_to_x(50)
p "Price #{dex2.xPrice()}  #{dex2.yPrice()}"

p "ETH TO USD"

dex3 = Dex.new(100,20000)
p "Price 1eth #{dex3.xPrice()} usd & 1 usd #{dex3.yPrice()} eth"
dex3.x_to_y(10)
p "Price #{dex3.xPrice()}  #{dex3.yPrice()}"
dex3.y_to_x(2000)
p "Price #{dex3.xPrice()}  #{dex3.yPrice()}"
