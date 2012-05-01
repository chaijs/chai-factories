TESTS = test/*.test.js
REPORTER = dot

all: clean
	@node support/compile.js

clean:
	@rm chai-factories.js

test:
	@NODE_ENV=test ./node_modules/.bin/mocha \
		--reporter $(REPORTER) \
		$(TESTS)

.PHONY: all clean test
