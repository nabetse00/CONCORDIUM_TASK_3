### Hackathon: Concordium Hackathon - The Future of Identity
# TASK 3: Your First Concordium DApp

# Task description

Create a web dApp that interacts with a deployed smart contract.
See [Gitcoin issue 29743](https://gitcoin.co/issue/29743)
for more details.

# Task requirements
- [x] Completion of TASK 1

[github repo for task 1](https://github.com/nabetse00/CONCORDIUM_TASK_1)

- [x] Completion of TASK 2

[github repo for task 2](https://github.com/nabetse00/CONCORDIUM_TASK_2)

# Concordium Mainnet address

`4Fo1erxUgLt7wDvaoUgxxBbV3rquCWZmnzGnDA2DUzv6FFqAKk`

# Acceptance Criteria
- [] A brief README file with instructions on how to run the dApp + a clear description of what the dApp does and how to use it (including valid input)
- [x] your Concordium mainnet address for payout
- [] Add gif/video showing the dApp in use

Link to the [Gitcoin issue 29743](https://gitcoin.co/issue/29743)

# Submission

## Dapp description

This dApp will interact with `become_the_richest` contract developed for
[TASK 2: Deploy Your First Smart Contract](https://gitcoin.co/issue/29742).

Contract details: 
```
become_the_richest Contract:
{"index":2975,"subindex":0}
Contract address:
1cbd409fd57d8e0283c28be708f6b72e0b2bffdeb99a620e14d52d0deb0bd42f
```

See [github repo for task 2](https://github.com/nabetse00/CONCORDIUM_TASK_2)
for details about this contract.

Dapp will allow a user to:
- Check who is the richest address 
- See the message the richest attached
- The amount the richest address sent
- The minimal increase needed to become the richest
- Send a update to the contract to become the richest

# set up 

```console
cd become-the-richest-dapp
npm i 
npm run dev 
```


