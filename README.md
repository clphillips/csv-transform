# csv-transform

Transforms a CSV file -- well, any delimited file, really, into another file using a template.

## Basic Usage

```sh
npm install csv-transform
```

```sh
node csv-transform -t '{{colA}} {{colB}}' < input.csv > output.txt
```

### Options

- **-t** or **--template** The string to use to transform the input file (i.e. 'The {{col1}} brown {{col2}} jumped over the {{col3}} dog.')
- **-i** or **--input** Path to the CSV input file.
- **-o** or **--output** Path to the output file.
- **-d** or **--delimiter** The column delimiter of the CSV input file.
- **-r** or **--rowDelimiter** The row delimiter of the CSV input file.
- **-q** or **--quote** The column quote character.
- **-e** or **--escape** The quote escape character.
- **-ot** or **--openTag** The open tag used in the template.
- **-ct** or **--closeTag** The close tag used in the template.
- **-v** or **--version** This version of csv-transform.
- **-h** or **--help** Prints help info.

## How it works

The columns defined in the first row of the input file become variable names. **csv-transform** accepts a template that is used to output a separate row for each input row based upon these variables.

Assume you have the following input file:

```text
ID,First Name,Last Name,Email
1,Roger,Sherman,judgesherman@mailinator.com
2,James,Madison,madmanmadison@mailinator.com
```

Now, from this input file we need a set of SQL queries to update user records with their correct name and email address. We can use the following template:

```
UPDATE users SET first_name='{{First Name}}', last_name='{{Last Name}}', email='{{email}}' WHERE id={{ID}};
```

When run against our input file it produces the following output:

```sql
UPDATE users SET first_name='Roger', last_name='Sherman', email='judgesherman@mailinator.com' WHERE id=1;
UPDATE users SET first_name='James', last_name='Madison', email='madmanmadison@mailinator.com' WHERE id=1;
```