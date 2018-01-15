using System.Linq;
using System.Collections.Generic;
using System.Text;
using System.Data;
using System.Collections;

namespace Ted.Server.Data
{
    static class SqlExtensions
    {
        public static string Bracketize(this List<string> columns)
        {
            return Bracketize(columns.ToArray());
        }

        public static string Bracketize(this string[] columns)
        {
            var cols = string.Empty;

            foreach (var item in columns)
            {
                cols += $"[{item}],";
            }
            cols = cols.TrimEnd(',');
            return cols;
        }
        public static string ToJson(this DataTable dt)
        {
            var sb = new StringBuilder();

            sb.Append("[\r\n");

            for (int i = 0; i < dt.Rows.Count; i++)
            {
                sb.Append("{\r\n");
                for (int j = 0; j < dt.Columns.Count; j++)
                {
                    var row = dt.Rows[i];
                    sb.Append($"\"{dt.Columns[j].ColumnName}\":\"{row[j].ToString()}\"");

                    if (j < dt.Columns.Count - 1)
                    {
                        sb.Append(",");
                    }
                    sb.Append("\r\n");

                }
                sb.Append("}");

                if (i < dt.Rows.Count - 1)
                {
                    sb.Append(",");
                }

                sb.Append("\r\n");
            }

            sb.Append("]");

            return sb.ToString();
        }

        public static int Count(this IEnumerable en)
        {
            int result = 0;
            var e = en.GetEnumerator();
            while (e.MoveNext())
                result++;

            return result;
        }

        public static string FormatJoin(this List<string> list, string fmt = "{0}", string seperator = ",")
        {
            var sb = new StringBuilder();

            for (int i = 0; i < list.Count(); i++)
            {
                sb.Append(string.Format(fmt, list[i]));
                if (i < list.Count() - 1)
                {
                    sb.Append(seperator);
                }
            }

            return sb.ToString();
        }
    }

}
