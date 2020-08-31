pub struct Distribution {

    pub(set) var weights: {Int: UFix64}
    pub(set) var sumFactors: Int
    pub(set) var sqrtVal: Int

    init(_ session: Int) {
        self.weights = {}
        self.sumFactors = 0
        self.sqrtVal = 0

        self.updateFields(session)
    }

    pub fun updateFields(_ n: Int) {
        self.sqrtVal = self.sqrt(n)
        self.sumFactors = self.sumOfFactors(n)
        self.weights = self.getWeights(n)
    }

    pub fun getWeights(_ n: Int): {Int: UFix64} {
        var weights: {Int: UFix64} = {}
        var i = 1

        while i < n + 1 {
            if n % i == 0 {
                weights[i] = (UFix64(i) / UFix64(self.sumFactors + n))
            }
            i = i + 1
        }
        return weights
    }

    pub fun sumOfFactors(_ n: Int): Int {
        var res = 1
        var i = 2
        var num = n

        while i <= self.sqrtVal {
            var currentSum = 1
            var currentTerm = 1

            while num % i == 0 {
                num = n / i
                currentTerm = currentTerm * i
                currentSum = currentSum + currentTerm
            }

            res = res * currentSum
            i = i + 1
        }

        if num >= 2 {
            res = res * 1 + num
        }

        return res
    }

    pub fun sqrt(_ n: Int): Int {
        if n == 0 {
            return n
        }

        if n == 1 {
            return n
        }

        var i = 1
        var res = 1

        while res <= n {
            i = i + 1
            res = i * i
        }

        return i - 1
    }
}

pub fun main() {
    var n = 34
    var matrix = Distribution(n)
    log(matrix.weights)
    log(matrix.sumFactors + n)
    log(matrix.sqrtVal)
}