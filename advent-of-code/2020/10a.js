(() => {
  function solve(input) {
    var lines = Utils.read(input).map((i) => parseInt(i));
    lines.push(0);
    lines.sort((a, b) => a - b);
    var diff1 = 0;
    var diff3 = 1;

    for (var i = 1; i < lines.length; i++) {
      if (lines[i] - lines[i - 1] == 1) diff1++;
      if (lines[i] - lines[i - 1] == 3) diff3++;
    }
    return diff1 * diff3;
  }

  var dataset = [];

  dataset.push({
    input: `16
10
15
5
1
11
7
19
6
12
4`,
    output: 35
  });

  dataset.push({
    input: `28
33
18
42
31
14
46
20
48
47
24
23
49
45
19
38
39
11
1
32
25
35
8
17
7
9
4
2
34
10
3`,
    output: 220
  });

  dataset.push({
    input: `49
89
70
56
34
14
102
148
143
71
15
107
127
165
135
26
119
46
53
69
134
1
40
81
140
160
33
117
82
55
25
11
128
159
61
105
112
99
93
151
20
108
168
2
109
75
139
170
65
114
21
92
106
162
124
158
38
136
95
161
146
129
154
121
86
118
88
50
48
62
155
28
120
78
60
147
87
27
7
54
39
113
5
74
169
6
43
8
29
18
68
32
19
133
22
94
47
132
59
83
12
13
96
35`,
    output: 2414
  });

  Utils.check(solve, dataset, "10a");
})();
